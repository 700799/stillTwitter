import { NextResponse } from 'next/server';
import { deleteScheduledPost } from '@/lib/db';

export async function DELETE(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  if (!id) return NextResponse.json({ error: 'id required' }, { status: 400 });
  deleteScheduledPost(Number(id));
  return NextResponse.json({ success: true });
}
