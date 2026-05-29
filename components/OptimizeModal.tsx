'use client';

import { useState } from 'react';
import type { Tweet, OptimizeResult } from '@/types';

type Props = {
  tweet: Tweet;
  onClose: () => void;
  onApplyHook: (newHook: string) => void;
};

export default function OptimizeModal({ tweet, onClose, onApplyHook }: Props) {
  const [result, setResult] = useState<OptimizeResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);
  const [applied, setApplied] = useState(false);

  const analyze = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/ai/optimize', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ tweetId: tweet.id }),
      });
      const data = await res.json();
      if (!res.ok) setError(data.error ?? 'Analysis failed.');
      else setResult(data.result);
    } catch {
      setError('Network error — could not analyze tweet.');
    } finally {
      setLoading(false);
    }
  };

  const copyHashtags = async () => {
    if (!result) return;
    await navigator.clipboard.writeText(result.hashtags.join(' '));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const apply = () => {
    if (!result) return;
    onApplyHook(result.rewritten_hook);
    setApplied(true);
  };

  const scoreColor = (s: number) => s >= 8 ? 'text-green-400' : s >= 5 ? 'text-yellow-400' : 'text-red-400';
  const scoreBorder = (s: number) => s >= 8 ? 'border-green-700 bg-green-950' : s >= 5 ? 'border-yellow-700 bg-yellow-950' : 'border-red-700 bg-red-950';

  return (
    <div
      className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="bg-gray-900 border border-gray-700 rounded-2xl p-6 max-w-lg w-full shadow-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h2 className="text-xl font-bold text-white">AI Content Optimizer</h2>
            <p className="text-gray-400 text-xs mt-0.5">{tweet.subject} · {tweet.category}</p>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-white text-xl font-bold px-1 leading-none">×</button>
        </div>

        {/* Current content preview */}
        <div className="bg-gray-800 rounded-lg p-3 mb-5">
          <p className="text-white text-sm font-semibold mb-1">{tweet.hook}</p>
          <p className="text-gray-400 text-xs line-clamp-2 leading-relaxed">{tweet.parts[0]}</p>
          {tweet.is_thread && <p className="text-gray-500 text-xs mt-1.5">🧵 {tweet.part_count}-part thread</p>}
        </div>

        {error && (
          <div className="bg-red-950 border border-red-700 text-red-300 px-3 py-2 rounded-lg text-sm mb-4">{error}</div>
        )}

        {!result && !loading && (
          <button
            onClick={analyze}
            className="w-full py-2.5 bg-purple-600 hover:bg-purple-500 rounded-lg font-medium text-sm transition-colors"
          >
            ✦ Analyze with AI
          </button>
        )}

        {loading && (
          <div className="text-center py-8 text-gray-400 text-sm">
            <div className="w-6 h-6 border-2 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
            Analyzing your tweet…
          </div>
        )}

        {result && (
          <div className="space-y-4">
            {/* Score */}
            <div className={`border rounded-lg px-4 py-3 ${scoreBorder(result.score)}`}>
              <div className="flex items-center gap-3">
                <span className={`text-4xl font-bold tabular-nums ${scoreColor(result.score)}`}>
                  {result.score}
                  <span className="text-base text-gray-500">/10</span>
                </span>
                <div>
                  <p className="text-white text-xs font-semibold mb-0.5">Engagement Score</p>
                  <p className="text-gray-300 text-xs leading-relaxed">{result.score_reason}</p>
                </div>
              </div>
            </div>

            {/* Suggested hook */}
            <div>
              <p className="text-gray-500 text-xs font-semibold uppercase tracking-wider mb-2">Suggested Hook</p>
              <div className="bg-gray-800 rounded-lg p-3 flex items-start gap-3">
                <p className="text-white text-sm flex-1 leading-relaxed">{result.rewritten_hook}</p>
                <button
                  onClick={apply}
                  disabled={applied}
                  className="text-xs bg-purple-600 hover:bg-purple-500 disabled:bg-gray-700 disabled:text-gray-500 px-3 py-1.5 rounded-lg font-medium transition-colors shrink-0"
                >
                  {applied ? '✓ Applied' : 'Apply'}
                </button>
              </div>
            </div>

            {/* Hashtags */}
            <div>
              <p className="text-gray-500 text-xs font-semibold uppercase tracking-wider mb-2">Hashtags</p>
              <div className="flex items-center gap-2 flex-wrap">
                {result.hashtags.map((tag) => (
                  <span key={tag} className="bg-blue-900/60 text-blue-300 text-xs px-2 py-1 rounded-full font-mono border border-blue-800">
                    {tag}
                  </span>
                ))}
                <button
                  onClick={copyHashtags}
                  className="text-xs text-gray-400 hover:text-white ml-auto transition-colors"
                >
                  {copied ? 'Copied ✓' : 'Copy all'}
                </button>
              </div>
            </div>

            {/* Best time */}
            <div className="bg-gray-800 rounded-lg px-4 py-3 flex items-center gap-3">
              <span className="text-lg shrink-0">⏰</span>
              <div>
                <p className="text-gray-500 text-xs font-semibold uppercase tracking-wider">Best Time to Post</p>
                <p className="text-white text-sm mt-0.5">{result.best_time}</p>
              </div>
            </div>

            {/* Tip */}
            <div className="bg-gray-800 rounded-lg px-4 py-3 flex items-start gap-3">
              <span className="text-lg shrink-0 mt-0.5">💡</span>
              <div>
                <p className="text-gray-500 text-xs font-semibold uppercase tracking-wider mb-1">Improvement Tip</p>
                <p className="text-white text-sm leading-relaxed">{result.tip}</p>
              </div>
            </div>

            <button
              onClick={() => { setResult(null); setApplied(false); }}
              className="w-full py-2 text-xs text-gray-500 hover:text-gray-300 transition-colors"
            >
              Re-analyze
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
