'use client';

import { useMemo } from 'react';
import TweetCard from './TweetCard';
import type { Tweet, SubjectStat } from '@/types';
import { SUBJECTS } from '@/data/constants';

type Props = {
  tweets: Tweet[];
  loading: boolean;
  subject: string;
  setSubject: (v: string) => void;
  search: string;
  setSearch: (v: string) => void;
  status: string;
  setStatus: (v: string) => void;
  subjectStats: SubjectStat[];
  onPostNow: (tweet: Tweet) => void;
  onSchedule: (tweet: Tweet) => void;
  onCancel: (tweet: Tweet) => void;
  onOptimize: (tweet: Tweet) => void;
  actionLoading: number | null;
};

export default function TweetGrid({
  tweets,
  loading,
  subject,
  setSubject,
  search,
  setSearch,
  status,
  setStatus,
  subjectStats,
  onPostNow,
  onSchedule,
  onCancel,
  onOptimize,
  actionLoading,
}: Props) {
  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return tweets.filter((t) => {
      if (q && !t.hook.toLowerCase().includes(q) && !t.parts[0].toLowerCase().includes(q)) return false;
      if (status === 'posted' && !t.posted) return false;
      if (status === 'pending' && (t.posted || t.is_scheduled)) return false;
      if (status === 'scheduled' && !t.is_scheduled) return false;
      return true;
    });
  }, [tweets, search, status]);

  const getCount = (name: string) => subjectStats.find((s) => s.name === name)?.total ?? 0;

  return (
    <div>
      {/* Subject tabs */}
      <div className="flex flex-wrap gap-2 mb-5">
        <button
          onClick={() => setSubject('')}
          className={`text-sm px-3 py-1.5 rounded-lg font-medium transition-colors ${
            !subject ? 'bg-white text-gray-900' : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
          }`}
        >
          All
        </button>
        {SUBJECTS.map((s) => (
          <button
            key={s}
            onClick={() => setSubject(s)}
            className={`text-sm px-3 py-1.5 rounded-lg font-medium transition-colors ${
              subject === s ? 'bg-white text-gray-900' : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
            }`}
          >
            {s}
            <span className="ml-1.5 text-xs opacity-60">{getCount(s)}</span>
          </button>
        ))}
      </div>

      {/* Search + status filter */}
      <div className="flex flex-wrap gap-3 mb-5">
        <input
          type="text"
          placeholder="Search hooks and content…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 min-w-[220px] bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500"
        />
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
              onOptimize={onOptimize}
              actionLoading={actionLoading === tweet.id}
            />
          ))}
        </div>
      )}
    </div>
  );
}
