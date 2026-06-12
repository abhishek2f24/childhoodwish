import { NextRequest, NextResponse } from 'next/server';
import { createRazorpayOrder } from '@/lib/razorpay';
import { priceOrder } from '@/lib/pricing';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { customer, items } = body;

    // Never trust a client-supplied amount — price the cart from the catalog.
    const priced = await priceOrder(items);
    if (!priced) {
      return NextResponse.json({ error: 'Invalid items' }, { status: 400 });
    }
    const amount = priced.total * 100; // paise

    const keyConfigured =
      process.env.RAZORPAY_KEY_ID &&
      process.env.RAZORPAY_KEY_SECRET &&
      !process.env.RAZORPAY_KEY_ID.includes('XXXXXXXXXXXX') &&
      !process.env.RAZORPAY_KEY_SECRET.includes('your_razorpay');

    if (!keyConfigured) {
      // No mock orders: a fake order id strands the customer inside a broken
      // Razorpay modal. Tell the client to fall back to COD instead.
      return NextResponse.json(
        { error: 'Online payment is not available right now. Please use Cash on Delivery.' },
        { status: 503 }
      );
    }

    const receipt = `receipt_${Date.now()}`;
    const order = await createRazorpayOrder({
      amount,
      receipt,
      notes: {
        customer_name: customer?.name || '',
        customer_email: customer?.email || '',
      },
    });
    return NextResponse.json({ orderId: order.id, amount: order.amount });
  } catch (error) {
    console.error('Create order error:', error);
    return NextResponse.json({ error: 'Failed to create order' }, { status: 500 });
  }
}
