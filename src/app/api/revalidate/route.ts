import { NextRequest, NextResponse } from 'next/server';
import { revalidateTag } from 'next/cache';

export async function POST(request: NextRequest) {
  try {
    const secret = request.nextUrl.searchParams.get('secret');
    
    // In production, configure SUPABASE_WEBHOOK_SECRET in Vercel
    if (secret !== process.env.SUPABASE_WEBHOOK_SECRET) {
      return NextResponse.json({ message: 'Invalid secret' }, { status: 401 });
    }

    const body = await request.json();
    
    // Supabase webhook payload
    // Revalidate the 'products' tag whenever there is an insert/update/delete in the products table
    if (body.table === 'products') {
      revalidateTag('products', 'default');
      return NextResponse.json({ revalidated: true, now: Date.now() });
    }

    return NextResponse.json({ revalidated: false, message: 'Unhandled table' }, { status: 400 });
  } catch (err) {
    return NextResponse.json({ message: 'Error revalidating' }, { status: 500 });
  }
}
