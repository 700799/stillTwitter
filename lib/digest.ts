import { getActiveSources, saveDigest, getDigestByDate, markDigestEmailSent } from './db';
import { fetchFeed } from './rss';
import { sendDigestEmail } from './email';
import type { DigestArticle } from '../types';

export async function generateDigest(): Promise<{ date: string; count: number; alreadyExists: boolean }> {
  const date = new Date().toISOString().split('T')[0];

  const existing = getDigestByDate(date);
  if (existing) return { date, count: existing.articles.length, alreadyExists: true };

  const sources = getActiveSources();
  const results = await Promise.allSettled(sources.map((s) => fetchFeed(s.url, s.name)));

  const allArticles: DigestArticle[] = [];
  results.forEach((r, i) => {
    if (r.status === 'fulfilled') {
      allArticles.push(...r.value);
    } else {
      console.error(`[digest] Failed to fetch "${sources[i].name}":`, r.reason);
    }
  });

  const seen = new Set<string>();
  const unique = allArticles.filter((a) => {
    if (!a.link || seen.has(a.link)) return false;
    seen.add(a.link);
    return true;
  });
  unique.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());

  saveDigest(date, unique);

  try {
    await sendDigestEmail(unique, date);
    markDigestEmailSent(date);
  } catch (e) {
    console.error('[digest] Email send failed:', e);
  }

  return { date, count: unique.length, alreadyExists: false };
}
