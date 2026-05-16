'use client';

import { useState, useEffect, useCallback } from 'react';
import StatsBar from '@/components/StatsBar';
import TweetGrid from '@/components/TweetGrid';
import ScheduleModal from '@/components/ScheduleModal';
import type { Tweet, Stats } from '@/types';

export default function Home() {
  const [tweets, setTweets] = useState<Tweet[]>([]);
  const [stats, setStats] = useState<Stats>({ total: 0, posted: 0, pending: 0, scheduled: 0 });
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [status, setStatus] = useState('');
  const [scheduleTarget, setScheduleTarget] = useState<Tweet | null>(null);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState<number | null>(null);
  const [error, setError] = useState('');

  const fetchTweets = useCallback(async () => {
    try {
      const res = await fetch('/api/tweets');
      const data = await res.json();
      setTweets(data.tweets);
      setStats(data.stats);
    } catch {
      setError('Failed to load tweets.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTweets();
  }, [fetchTweets]);

  const handlePostNow = async (tweet: Tweet) => {
    setActionLoading(tweet.id);
    setError('');
    try {
      const res = await fetch('/api/post', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ tweetId: tweet.id }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? 'Failed to post tweet.');
      } else {
        await fetchTweets();
      }
    } catch {
      setError('Network error — could not post tweet.');
    } finally {
      setActionLoading(null);
    }
  };

  const handleCancel = async (tweet: Tweet) => {
    if (!confirm('Cancel this scheduled tweet?')) return;
    setActionLoading(tweet.id);
    setError('');
    try {
      const res = await fetch('/api/schedule', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ tweetId: tweet.id }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? 'Failed to cancel scheduled tweet.');
      } else {
        await fetchTweets();
      }
    } catch {
      setError('Network error — could not cancel scheduled tweet.');
    } finally {
      setActionLoading(null);
    }
  };

  const handleSchedule = async (tweet: Tweet, scheduledAt: string) => {
    setActionLoading(tweet.id);
    setError('');
    try {
      const res = await fetch('/api/schedule', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ tweetId: tweet.id, scheduledAt }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? 'Failed to schedule tweet.');
      } else {
        setScheduleTarget(null);
        await fetchTweets();
      }
    } catch {
      setError('Network error — could not schedule tweet.');
    } finally {
      setActionLoading(null);
    }
  };

  return (
    <main className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white">Claude Code Tweet Dashboard</h1>
        <p className="text-gray-400 mt-1">150 daily tips on Claude Code AI agent — post or schedule to Twitter</p>
      </div>

      {error && (
        <div className="bg-red-950 border border-red-700 text-red-200 px-4 py-3 rounded-lg mb-6 flex items-center justify-between gap-4">
          <span className="text-sm">{error}</span>
          <button
            onClick={() => setError('')}
            className="text-red-400 hover:text-red-200 font-bold text-lg leading-none shrink-0"
            aria-label="Dismiss"
          >
            ×
          </button>
        </div>
      )}

      <StatsBar stats={stats} />

      <TweetGrid
        tweets={tweets}
        loading={loading}
        search={search}
        setSearch={setSearch}
        category={category}
        setCategory={setCategory}
        status={status}
        setStatus={setStatus}
        onPostNow={handlePostNow}
        onSchedule={(tweet) => setScheduleTarget(tweet)}
        onCancel={handleCancel}
        actionLoading={actionLoading}
      />

      {scheduleTarget && (
        <ScheduleModal
          tweet={scheduleTarget}
          onConfirm={(scheduledAt) => handleSchedule(scheduleTarget, scheduledAt)}
          onClose={() => setScheduleTarget(null)}
        />
      )}
    </main>
  );
}
