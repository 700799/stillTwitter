import { NextRequest, NextResponse } from 'next/server';
import { getTweets, getStats, getSubjectStats } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const subject = searchParams.get('subject') ?? undefined;

  const tweets = getTweets({ subject });
  const stats = getStats();
  const subjectStats = getSubjectStats();

  return NextResponse.json({ tweets, stats, subjectStats });
}
