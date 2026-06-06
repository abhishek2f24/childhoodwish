import { NextRequest, NextResponse } from 'next/server';
import { sendWaitlistWelcomeEmail } from '@/lib/resend';
import { supabase } from '@/lib/supabase';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, wish } = body;

    if (!email || !email.includes('@')) {
      return NextResponse.json({ success: false, error: 'Valid email required' }, { status: 400 });
    }

    // Save to Supabase waitlist table
    const { error: dbError } = await supabase.from('waitlist').insert({ email, wish });
    
    if (dbError) {
      console.error('Waitlist DB error:', dbError);
      // Depending on the DB error, it might be a duplicate email.
      if (dbError.code === '23505') {
        return NextResponse.json({ success: false, error: 'You are already on the waitlist!' }, { status: 400 });
      }
    }

    // Send welcome email via Resend
    if (process.env.RESEND_API_KEY) {
      await sendWaitlistWelcomeEmail(email, wish);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Something went wrong' }, { status: 500 });
  }
}
