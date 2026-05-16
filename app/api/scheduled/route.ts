import { NextResponse } from 'next/server';
import { getScheduledPosts } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function GET() {
  const posts = getScheduledPosts();
  return NextResponse.json({ posts });
}
