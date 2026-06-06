import { NextRequest, NextResponse } from 'next/server';
import { submitMemory } from '@/lib/memoryWall';
import { supabase } from '@/lib/supabase';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { wish, decade } = body;

    if (!wish || !decade) {
      return NextResponse.json({ success: false, error: 'Wish and decade are required' }, { status: 400 });
    }

    if (wish.length > 200) {
      return NextResponse.json({ success: false, error: 'Wish is too long (max 200 chars)' }, { status: 400 });
    }

    // Get client IP
    const ip = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown';

    // Simple rate limiting via Supabase (max 1 request per 10 seconds per IP)
    if (ip !== 'unknown') {
      const tenSecondsAgo = new Date(Date.now() - 10000).toISOString();
      const { count } = await supabase
        .from('memory_wall')
        .select('*', { count: 'exact', head: true })
        .eq('ip_address', ip)
        .gte('created_at', tenSecondsAgo);
        
      if (count && count > 0) {
        return NextResponse.json(
          { success: false, error: 'You are submitting too fast. Please wait a bit!' },
          { status: 429 }
        );
      }
    }

    const success = await submitMemory(wish, decade, ip);

    if (success) {
      return NextResponse.json({ success: true });
    } else {
      return NextResponse.json({ success: false, error: 'Failed to save submission' }, { status: 500 });
    }
  } catch (error) {
    console.error('Memory wall submit error:', error);
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 });
  }
}
