import { NextResponse } from 'next/server';
import { toggleSourceActive, deleteSource } from '@/lib/db';

export async function PATCH(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  toggleSourceActive(Number(id));
  return NextResponse.json({ success: true });
}

export async function DELETE(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  deleteSource(Number(id));
  return NextResponse.json({ success: true });
}
