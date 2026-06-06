import { NextRequest, NextResponse } from 'next/server';
import { sendAbandonedCartEmail } from '@/lib/resend';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, cartItems, total } = body;

    if (!email || !cartItems?.length) {
      return NextResponse.json({ success: false, error: 'Email and cart items required' }, { status: 400 });
    }

    // In production: use Resend's scheduled emails (1-hour delay)
    // For now, send immediately
    if (process.env.RESEND_API_KEY) {
      await sendAbandonedCartEmail(email, cartItems, total);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to process' }, { status: 500 });
  }
}
