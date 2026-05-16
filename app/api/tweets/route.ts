import { NextResponse } from 'next/server';
import { getTweets, getStats } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function GET() {
  const tweets = getTweets();
  const stats = getStats();
  return NextResponse.json({ tweets, stats });
}
