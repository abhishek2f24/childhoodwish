import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    
    if (!id) {
      return NextResponse.json({ success: false, error: 'Order ID is required' }, { status: 400 });
    }

    const { data: order, error } = await supabase
      .from('orders')
      .select('id, created_at, status, total, items, shipping_address, customer_email, customer_name, razorpay_payment_id')
      .eq('id', id)
      .single();

    if (error || !order) {
      return NextResponse.json({ success: false, error: 'Order not found' }, { status: 404 });
    }

    // Map DB snake_case columns back to expected frontend API shape
    const formattedOrder = {
      id: order.id,
      date: order.created_at,
      status: order.status,
      total: order.total,
      items: order.items,
      shippingAddress: order.shipping_address,
      customerEmail: order.customer_email,
      customerName: order.customer_name,
      paymentId: order.razorpay_payment_id,
    };

    return NextResponse.json({ success: true, order: formattedOrder });
  } catch (error) {
    console.error('Fetch order error:', error);
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 });
  }
}
