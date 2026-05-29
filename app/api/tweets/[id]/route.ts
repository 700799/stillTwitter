import { NextResponse } from 'next/server';
import { updateTweetHook } from '@/lib/db';

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const { hook } = await req.json();
  if (!hook?.trim()) return NextResponse.json({ error: 'hook required' }, { status: 400 });
  updateTweetHook(Number(id), hook.trim());
  return NextResponse.json({ success: true });
}
