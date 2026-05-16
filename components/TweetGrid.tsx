'use client';

import { useMemo } from 'react';
import TweetCard from './TweetCard';
import type { Tweet } from '@/types';

const CATEGORIES = [
  'Getting Started',
  'Slash Commands',
  'Tool Use & Permissions',
  'Hooks & Automation',
  'MCP Servers',
  'IDE Integration',
  'Multi-Agent & Subagents',
  'Productivity Tips',
  'Advanced Features',
  'Troubleshooting & Best Practices',
];

type Props = {
  tweets: Tweet[];
  loading: boolean;
  search: string;
  setSearch: (v: string) => void;
  category: string;
  setCategory: (v: string) => void;
  status: string;
  setStatus: (v: string) => void;
  onPostNow: (tweet: Tweet) => void;
  onSchedule: (tweet: Tweet) => void;
  onCancel: (tweet: Tweet) => void;
  actionLoading: number | null;
};

export default function TweetGrid({
  tweets,
  loading,
  search,
  setSearch,
  category,
  setCategory,
  status,
  setStatus,
  onPostNow,
  onSchedule,
  onCancel,
  actionLoading,
}: Props) {
  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return tweets.filter((t) => {
      if (q && !t.content.toLowerCase().includes(q)) return false;
      if (category && t.category !== category) return false;
      if (status === 'posted' && !t.posted) return false;
      if (status === 'pending' && (t.posted || t.is_scheduled)) return false;
      if (status === 'scheduled' && !t.is_scheduled) return false;
      return true;
    });
  }, [tweets, search, category, status]);

  return (
    <div>
      <div className="flex flex-wrap gap-3 mb-6">
        <input
          type="text"
          placeholder="Search tweets…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 min-w-[200px] bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500"
        />
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500"
        >
          <option value="">All Categories</option>
          {CATEGORIES.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500"
        >
          <option value="">All Status</option>
          <option value="pending">Pending</option>
          <option value="posted">Posted</option>
          <option value="scheduled">Scheduled</option>
        </select>
      </div>

      <div className="text-sm text-gray-400 mb-4">
        {loading ? 'Loading…' : `${filtered.length} tweet${filtered.length !== 1 ? 's' : ''}`}
      </div>

      {loading ? (
        <div className="text-center py-20 text-gray-500">Loading tweets…</div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-20 text-gray-500">No tweets match your filters.</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((tweet) => (
            <TweetCard
              key={tweet.id}
              tweet={tweet}
              onPostNow={onPostNow}
              onSchedule={onSchedule}
              onCancel={onCancel}
              actionLoading={actionLoading === tweet.id}
            />
          ))}
        </div>
      )}
    </div>
  );
}
