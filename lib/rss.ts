import Parser from 'rss-parser';
import type { DigestArticle } from '../types';

const parser = new Parser({
  timeout: 10000,
  headers: { 'User-Agent': 'Mozilla/5.0 (compatible; NewsDigestBot/1.0)' },
});

export async function fetchFeed(url: string, sourceName: string): Promise<DigestArticle[]> {
  const feed = await parser.parseURL(url);
  return feed.items.slice(0, 10).map((item) => ({
    title: item.title ?? '(no title)',
    link: item.link ?? '',
    description: item.contentSnippet ?? null,
    source: sourceName,
    publishedAt: item.isoDate ?? new Date().toISOString(),
  }));
}
