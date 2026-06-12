import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { supabase } from '@/lib/supabase';
import { priceOrder } from '@/lib/pricing';
import { sendOrderConfirmationEmail, sendAdminNotificationEmail } from '@/lib/resend';

const codSchema = z.object({
  customer: z.object({
    name: z.string().min(2).max(100),
    email: z.string().email(),
    phone: z.string().min(10).max(15),
    address: z.string().min(8).max(300),
    city: z.string().min(2).max(60),
    state: z.string().min(2).max(60),
    pincode: z.string().regex(/^\d{6}$/),
    personalNote: z.string().max(500).optional(),
  }),
  items: z
    .array(
      z.object({
        product: z.object({ id: z.string().min(1) }).passthrough(),
        quantity: z.number().int().min(1).max(10),
        giftWrapping: z.boolean().optional(),
      })
    )
    .min(1)
    .max(20),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const parsed = codSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { success: false, error: 'Invalid order data' },
        { status: 400 }
      );
    }

    const { customer, items } = parsed.data;

    const priced = await priceOrder(items);
    if (!priced) {
      return NextResponse.json(
        { success: false, error: 'One or more items are unavailable' },
        { status: 400 }
      );
    }

    const orderId = `CW${Date.now().toString().slice(-8)}`;
    const shippingAddress = {
      street: customer.address,
      city: customer.city,
      state: customer.state,
      pincode: customer.pincode,
    };

    const { error: dbError } = await supabase.from('orders').insert({
      id: orderId,
      razorpay_order_id: null,
      razorpay_payment_id: null,
      customer_name: customer.name,
      customer_email: customer.email,
      customer_phone: customer.phone,
      shipping_address: shippingAddress,
      personal_note: customer.personalNote,
      items: priced.lines,
      total: priced.total,
      status: 'cod_pending',
    });

    if (dbError) {
      console.error('Failed to save COD order:', dbError);
      return NextResponse.json(
        { success: false, error: 'Failed to save order' },
        { status: 500 }
      );
    }

    // Emails are best-effort — a broken email key must never lose an order.
    const resendKey = process.env.RESEND_API_KEY;
    if (resendKey && !resendKey.includes('placeholder') && customer.email) {
      const formattedAddress = `${customer.address}\n${customer.city}, ${customer.state} ${customer.pincode}`;
      const deliveryDate = new Date();
      deliveryDate.setDate(deliveryDate.getDate() + 5);
      const estimatedDelivery = deliveryDate.toLocaleDateString('en-IN', {
        weekday: 'short',
        month: 'short',
        day: 'numeric',
      });
      try {
        await sendOrderConfirmationEmail(
          customer.email,
          orderId,
          priced.lines,
          priced.total,
          customer.name,
          formattedAddress,
          estimatedDelivery
        );
        await sendAdminNotificationEmail(
          orderId,
          priced.total,
          customer.name,
          priced.lines,
          customer.email,
          customer.phone,
          formattedAddress
        );
      } catch (emailError) {
        console.error('COD email sending failed:', emailError);
      }
    }

    return NextResponse.json({ success: true, orderId, total: priced.total });
  } catch (error) {
    console.error('COD order error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to place order' },
      { status: 500 }
    );
  }
}
