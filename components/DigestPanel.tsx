'use client';

import type { DigestArticle, NewsDigest } from '@/types';

type Props = {
  digest: NewsDigest;
  onClose: () => void;
  onTweetAbout: (article: DigestArticle) => void;
};

function relativeTime(iso: string): string {
  const diff = Date.now() - new Date(iso).getTime();
  const h = Math.floor(diff / 3_600_000);
  const m = Math.floor(diff / 60_000);
  if (h >= 24) return `${Math.floor(h / 24)}d ago`;
  if (h >= 1) return `${h}h ago`;
  if (m >= 1) return `${m}m ago`;
  return 'just now';
}

export default function DigestPanel({ digest, onClose, onTweetAbout }: Props) {
  return (
    <div className="bg-gray-900 border border-gray-700 rounded-2xl mb-8 overflow-hidden">
      <div className="flex items-center justify-between px-5 py-4 border-b border-gray-700">
        <div className="flex items-center gap-3">
          <h2 className="text-white font-semibold text-base">Today&apos;s Digest</h2>
          <span className="bg-blue-900 text-blue-300 text-xs px-2 py-0.5 rounded-full font-medium">
            {digest.articles.length} articles
          </span>
          <span className="text-gray-500 text-xs">{digest.date}</span>
        </div>
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-white text-xl leading-none font-bold px-1"
          aria-label="Close digest"
        >
          ×
        </button>
      </div>

      {digest.articles.length === 0 ? (
        <div className="px-5 py-8 text-center text-gray-500 text-sm">No articles in this digest.</div>
      ) : (
        <div>
          {digest.articles.map((article, i) => (
            <div key={i} className="px-5 py-4 border-b border-gray-800 last:border-0 flex items-start gap-4">
              <div className="flex-1 min-w-0">
                <p className="text-white text-sm font-medium line-clamp-2 leading-snug">{article.title}</p>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-gray-400 text-xs">{article.source}</span>
                  <span className="text-gray-600 text-xs">·</span>
                  <span className="text-gray-500 text-xs">{relativeTime(article.publishedAt)}</span>
                </div>
                {article.description && (
                  <p className="text-gray-500 text-xs mt-1 line-clamp-2 leading-relaxed">{article.description}</p>
                )}
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <a
                  href={article.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs bg-gray-700 hover:bg-gray-600 px-3 py-1.5 rounded-lg font-medium transition-colors"
                >
                  Read →
                </a>
                <button
                  onClick={() => onTweetAbout(article)}
                  className="text-xs bg-blue-700 hover:bg-blue-600 px-3 py-1.5 rounded-lg font-medium transition-colors"
                >
                  Tweet
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
