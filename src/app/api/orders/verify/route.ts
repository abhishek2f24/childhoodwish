import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { verifyRazorpaySignature } from '@/lib/razorpay';
import { sendOrderConfirmationEmail, sendAdminNotificationEmail } from '@/lib/resend';
import { supabase } from '@/lib/supabase';

const verifySchema = z.object({
  razorpay_order_id: z.string().min(1),
  razorpay_payment_id: z.string().min(1),
  razorpay_signature: z.string().min(1),
  customer: z.object({
    name: z.string().min(2),
    email: z.string().email(),
    phone: z.string().optional(),
    address: z.any().optional(),
    personalNote: z.string().optional(),
  }),
  items: z.array(z.any()),
  total: z.number().positive(),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    const validatedData = verifySchema.safeParse(body);
    if (!validatedData.success) {
      return NextResponse.json({ success: false, error: 'Invalid payload data' }, { status: 400 });
    }

    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      customer,
      items,
      total,
    } = validatedData.data;

    // 1. Verify Signature securely on server
    const isValid = verifyRazorpaySignature(
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature
    );

    if (!isValid) {
      return NextResponse.json({ success: false, error: 'Invalid payment signature' }, { status: 400 });
    }

    // 2. Prevent duplicate processing via Supabase check
    const { data: existingOrder } = await supabase
      .from('orders')
      .select('id')
      .eq('razorpay_order_id', razorpay_order_id)
      .single();

    if (existingOrder) {
      return NextResponse.json({ 
        success: true, 
        message: 'Order already processed', 
        orderId: existingOrder.id 
      });
    }

    // 3. Generate internal Order ID
    const orderId = `CW${Date.now().toString().slice(-8)}`;

    // 4. Save to Supabase
    const { error: dbError } = await supabase.from('orders').insert({
      id: orderId,
      razorpay_order_id,
      razorpay_payment_id,
      customer_name: customer.name,
      customer_email: customer.email,
      customer_phone: customer.phone,
      shipping_address: customer.address,
      personal_note: customer.personalNote,
      items,
      total,
      status: 'paid',
    });

    if (dbError) {
      console.error('Failed to save order to Supabase:', dbError);
      return NextResponse.json({ success: false, error: 'Failed to save order' }, { status: 500 });
    }

    // 5. Trigger Webhook/ISR explicitly? 
    // Usually Supabase webhook handles this, but we can do it manually here for inventory if we had an inventory decrement.
    // For now, Supabase webhook will fire on table updates if configured in the Supabase dashboard.

    const formattedAddress = customer.address ? 
      `${customer.address.street || ''}\n${customer.address.city || ''}, ${customer.address.state || ''} ${customer.address.pincode || ''}`.trim() : 
      'N/A';
      
    // Set estimated delivery as 5 days from now
    const deliveryDate = new Date();
    deliveryDate.setDate(deliveryDate.getDate() + 5);
    const estimatedDelivery = deliveryDate.toLocaleDateString('en-IN', { weekday: 'short', month: 'short', day: 'numeric' });

    // 6. Send confirmation emails
    if (process.env.RESEND_API_KEY && customer?.email) {
      try {
        await sendOrderConfirmationEmail(
          customer.email, 
          orderId, 
          items, 
          total, 
          customer.name, 
          formattedAddress, 
          estimatedDelivery
        );
        await sendAdminNotificationEmail(
          orderId, 
          total, 
          customer.name, 
          items, 
          customer.email, 
          customer.phone, 
          formattedAddress
        );
      } catch (emailError) {
        console.error('Email sending failed:', emailError);
      }
    }

    return NextResponse.json({ success: true, orderId });
  } catch (error) {
    console.error('Verify order error:', error);
    return NextResponse.json({ success: false, error: 'Verification failed' }, { status: 500 });
  }
}
