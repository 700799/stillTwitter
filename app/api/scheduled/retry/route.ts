import { NextResponse } from 'next/server';
import { retryScheduledPost } from '@/lib/db';

export async function POST(req: Request) {
  const { scheduledId } = await req.json();
  if (!scheduledId) return NextResponse.json({ error: 'scheduledId required' }, { status: 400 });
  retryScheduledPost(Number(scheduledId));
  return NextResponse.json({ success: true });
}
