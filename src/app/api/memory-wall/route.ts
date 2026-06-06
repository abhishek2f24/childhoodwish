import { NextRequest, NextResponse } from 'next/server';
import { getApprovedSubmissions } from '@/lib/memoryWall';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const page = parseInt(searchParams.get('page') || '1');
  const limit = parseInt(searchParams.get('limit') || '20');

  const { submissions, total } = await getApprovedSubmissions(page, limit);

  return NextResponse.json({ submissions, total, page, limit });
}
