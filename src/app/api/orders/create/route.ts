import { NextRequest, NextResponse } from 'next/server';
import { createRazorpayOrder } from '@/lib/razorpay';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { amount, customer, items } = body;

    if (!amount || amount < 100) {
      return NextResponse.json({ error: 'Invalid amount' }, { status: 400 });
    }

    const receipt = `receipt_${Date.now()}`;

    // In production with Razorpay configured:
    if (
      process.env.RAZORPAY_KEY_ID &&
      process.env.RAZORPAY_KEY_SECRET &&
      !process.env.RAZORPAY_KEY_ID.includes('XXXXXXXXXXXX')
    ) {
      const order = await createRazorpayOrder({
        amount,
        receipt,
        notes: {
          customer_name: customer?.name || '',
          customer_email: customer?.email || '',
        },
      });
      return NextResponse.json({ orderId: order.id, amount: order.amount });
    }

    // Mock order for development (when Razorpay not configured)
    const mockOrderId = `order_mock_${Date.now()}`;
    return NextResponse.json({ orderId: mockOrderId, amount });
  } catch (error) {
    console.error('Create order error:', error);
    return NextResponse.json({ error: 'Failed to create order' }, { status: 500 });
  }
}
