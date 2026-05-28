import { NextResponse } from 'next/server';
import { getLatestDigest, getDigestByDate } from '@/lib/db';
import { generateDigest } from '@/lib/digest';

export const dynamic = 'force-dynamic';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const date = searchParams.get('date');
  const digest = date ? getDigestByDate(date) : getLatestDigest();
  return NextResponse.json({ digest });
}

export async function POST() {
  try {
    const result = await generateDigest();
    return NextResponse.json(result);
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 500 });
  }
}
