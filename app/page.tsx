'use client';

import { useState, useEffect, useCallback } from 'react';
import StatsBar from '@/components/StatsBar';
import TweetGrid from '@/components/TweetGrid';
import ScheduleModal from '@/components/ScheduleModal';
import AccountsModal from '@/components/AccountsModal';
import UploadModal from '@/components/UploadModal';
import ComposeModal from '@/components/ComposeModal';
import ScheduledQueue from '@/components/ScheduledQueue';
import DigestPanel from '@/components/DigestPanel';
import OptimizeModal from '@/components/OptimizeModal';
import type { Tweet, Stats, SubjectStat, ScheduledPost, NewsDigest, DigestArticle } from '@/types';

type AccountMeta = { id: string; name: string };

const ACCOUNT_KEY = 'selectedAccountId';

export default function Home() {
  const [tweets, setTweets] = useState<Tweet[]>([]);
  const [stats, setStats] = useState<Stats>({ total: 0, posted: 0, pending: 0, scheduled: 0 });
  const [subjectStats, setSubjectStats] = useState<SubjectStat[]>([]);
  const [accounts, setAccounts] = useState<AccountMeta[]>([]);
  const [selectedAccount, setSelectedAccount] = useState('');
  const [subject, setSubject] = useState('');
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('');
  const [scheduleTarget, setScheduleTarget] = useState<Tweet | null>(null);
  const [showAccounts, setShowAccounts] = useState(false);
  const [showUpload, setShowUpload] = useState(false);
  const [showCompose, setShowCompose] = useState(false);
  const [showQueue, setShowQueue] = useState(false);
  const [queuePosts, setQueuePosts] = useState<ScheduledPost[]>([]);
  const [digest, setDigest] = useState<NewsDigest | null>(null);
  const [showDigest, setShowDigest] = useState(false);
  const [composeInitial, setComposeInitial] = useState<{ hook: string; content: string } | null>(null);
  const [optimizeTarget, setOptimizeTarget] = useState<Tweet | null>(null);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState<number | null>(null);
  const [error, setError] = useState('');

  const fetchAccounts = useCallback(async () => {
    const res = await fetch('/api/accounts');
    const data = await res.json();
    const list: AccountMeta[] = data.accounts ?? [];
    setAccounts(list);
    const saved = typeof window !== 'undefined' ? localStorage.getItem(ACCOUNT_KEY) : null;
    const valid = saved && list.find((a) => a.id === saved) ? saved : list[0]?.id ?? '';
    setSelectedAccount(valid);
  }, []);

  const fetchTweets = useCallback(async () => {
    try {
      const params = new URLSearchParams();
      if (subject) params.set('subject', subject);
      const res = await fetch(`/api/tweets?${params}`);
      const data = await res.json();
      setTweets(data.tweets ?? []);
      setStats(data.stats ?? { total: 0, posted: 0, pending: 0, scheduled: 0 });
      setSubjectStats(data.subjectStats ?? []);
    } catch {
      setError('Failed to load tweets.');
    } finally {
      setLoading(false);
    }
  }, [subject]);

  const fetchQueue = useCallback(async () => {
    try {
      const res = await fetch('/api/scheduled');
      const data = await res.json();
      setQueuePosts(data.posts ?? []);
    } catch {
      // non-critical
    }
  }, []);

  const fetchDigest = useCallback(async () => {
    try {
      const res = await fetch('/api/admin/digest');
      const data = await res.json();
      setDigest(data.digest ?? null);
    } catch {
      // non-critical
    }
  }, []);

  useEffect(() => { fetchAccounts(); }, [fetchAccounts]);
  useEffect(() => { fetchTweets(); fetchQueue(); fetchDigest(); }, [fetchTweets, fetchQueue, fetchDigest]);

  const saveAccount = (id: string) => {
    setSelectedAccount(id);
    if (typeof window !== 'undefined') localStorage.setItem(ACCOUNT_KEY, id);
  };

  const requireAccount = (): string | null => {
    if (!selectedAccount) {
      setError('No Twitter account selected. Click "Accounts" to add one.');
      return null;
    }
    return selectedAccount;
  };

  const handlePostNow = async (tweet: Tweet) => {
    const accountId = requireAccount();
    if (!accountId) return;
    setActionLoading(tweet.id);
    setError('');
    try {
      const res = await fetch('/api/post', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ tweetId: tweet.id, accountId }),
      });
      const data = await res.json();
      if (!res.ok) setError(data.error ?? 'Failed to post tweet.');
      else await fetchTweets();
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
      if (!res.ok) setError(data.error ?? 'Failed to cancel.');
      else await Promise.all([fetchTweets(), fetchQueue()]);
    } catch {
      setError('Network error — could not cancel tweet.');
    } finally {
      setActionLoading(null);
    }
  };

  const handleSchedule = async (tweet: Tweet, scheduledAt: string) => {
    const accountId = requireAccount();
    if (!accountId) return;
    setActionLoading(tweet.id);
    setError('');
    try {
      const res = await fetch('/api/schedule', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ tweetId: tweet.id, accountId, scheduledAt }),
      });
      const data = await res.json();
      if (!res.ok) setError(data.error ?? 'Failed to schedule tweet.');
      else { setScheduleTarget(null); await Promise.all([fetchTweets(), fetchQueue()]); }
    } catch {
      setError('Network error — could not schedule tweet.');
    } finally {
      setActionLoading(null);
    }
  };

  const handleQueueCancel = async (scheduledId: number) => {
    if (!confirm('Cancel this scheduled post?')) return;
    setError('');
    try {
      const res = await fetch(`/api/scheduled/${scheduledId}`, { method: 'DELETE' });
      const data = await res.json();
      if (!res.ok) setError(data.error ?? 'Failed to cancel.');
      else await Promise.all([fetchTweets(), fetchQueue()]);
    } catch {
      setError('Network error — could not cancel.');
    }
  };

  const handleQueueRetry = async (scheduledId: number) => {
    setError('');
    try {
      const res = await fetch('/api/scheduled/retry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ scheduledId }),
      });
      const data = await res.json();
      if (!res.ok) setError(data.error ?? 'Failed to retry.');
      else await Promise.all([fetchTweets(), fetchQueue()]);
    } catch {
      setError('Network error — could not retry.');
    }
  };

  const handleQueueReschedule = async (post: ScheduledPost, newScheduledAt: string) => {
    setError('');
    try {
      await fetch(`/api/scheduled/${post.id}`, { method: 'DELETE' });
      const res = await fetch('/api/schedule', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ tweetId: post.tweet_id, accountId: post.account_id, scheduledAt: newScheduledAt }),
      });
      const data = await res.json();
      if (!res.ok) setError(data.error ?? 'Failed to reschedule.');
      else await Promise.all([fetchTweets(), fetchQueue()]);
    } catch {
      setError('Network error — could not reschedule.');
    }
  };

  const handleApplyHook = async (tweetId: number, newHook: string) => {
    try {
      await fetch(`/api/tweets/${tweetId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ hook: newHook }),
      });
      await fetchTweets();
    } catch {
      // non-critical
    }
  };

  return (
    <main className="max-w-7xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
        <div>
          <h1 className="text-3xl font-bold text-white">Tweet Dashboard</h1>
          <p className="text-gray-400 mt-1 text-sm">
            {stats.total} tweets across {subjectStats.length} subjects
          </p>
        </div>
        <div className="flex items-center gap-3 flex-wrap">
          {accounts.length > 0 ? (
            <select
              value={selectedAccount}
              onChange={(e) => saveAccount(e.target.value)}
              className="bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-blue-500"
            >
              {accounts.map((a) => (
                <option key={a.id} value={a.id}>{a.name}</option>
              ))}
            </select>
          ) : (
            <span className="text-sm text-yellow-400">No accounts configured</span>
          )}
          <button
            onClick={() => setShowAccounts(true)}
            className="text-sm bg-gray-700 hover:bg-gray-600 px-3 py-2 rounded-lg font-medium transition-colors"
          >
            Accounts
          </button>
          <button
            onClick={() => setShowUpload(true)}
            className="text-sm bg-gray-700 hover:bg-gray-600 px-3 py-2 rounded-lg font-medium transition-colors"
          >
            Upload JSON
          </button>
          {digest && (
            <button
              onClick={() => setShowDigest((v) => !v)}
              className="text-sm bg-gray-700 hover:bg-gray-600 px-3 py-2 rounded-lg font-medium transition-colors"
            >
              Digest ({digest.articles.length})
            </button>
          )}
          <button
            onClick={() => setShowCompose(true)}
            className="text-sm bg-blue-600 hover:bg-blue-500 px-3 py-2 rounded-lg font-medium transition-colors"
          >
            + Compose
          </button>
        </div>
      </div>

      {/* Error banner */}
      {error && (
        <div className="bg-red-950 border border-red-700 text-red-200 px-4 py-3 rounded-lg mb-5 flex items-center justify-between gap-4">
          <span className="text-sm">{error}</span>
          <button onClick={() => setError('')} className="text-red-400 hover:text-red-200 font-bold text-lg leading-none shrink-0">×</button>
        </div>
      )}

      <StatsBar stats={stats} onScheduledClick={() => setShowQueue((v) => !v)} />

      <TweetGrid
        tweets={tweets}
        loading={loading}
        subject={subject}
        setSubject={(s) => { setSubject(s); setLoading(true); }}
        search={search}
        setSearch={setSearch}
        status={status}
        setStatus={setStatus}
        subjectStats={subjectStats}
        onPostNow={handlePostNow}
        onSchedule={(tweet) => setScheduleTarget(tweet)}
        onCancel={handleCancel}
        onOptimize={(tweet) => setOptimizeTarget(tweet)}
        actionLoading={actionLoading}
      />

      {scheduleTarget && (
        <ScheduleModal
          tweet={scheduleTarget}
          onConfirm={(scheduledAt) => handleSchedule(scheduleTarget, scheduledAt)}
          onClose={() => setScheduleTarget(null)}
        />
      )}
      {showAccounts && (
        <AccountsModal
          accounts={accounts}
          onClose={() => setShowAccounts(false)}
          onRefresh={fetchAccounts}
        />
      )}
      {showUpload && (
        <UploadModal
          onClose={() => setShowUpload(false)}
          onSuccess={fetchTweets}
        />
      )}
      {optimizeTarget && (
        <OptimizeModal
          tweet={optimizeTarget}
          onClose={() => setOptimizeTarget(null)}
          onApplyHook={(newHook) => handleApplyHook(optimizeTarget.id, newHook)}
        />
      )}
      {showCompose && (
        <ComposeModal
          accounts={accounts}
          selectedAccountId={selectedAccount}
          initialHook={composeInitial?.hook}
          initialContent={composeInitial?.content}
          onClose={() => { setShowCompose(false); setComposeInitial(null); }}
          onSuccess={fetchTweets}
        />
      )}
      {showDigest && digest && (
        <DigestPanel
          digest={digest}
          onClose={() => setShowDigest(false)}
          onTweetAbout={(article: DigestArticle) => {
            setComposeInitial({ hook: article.title, content: article.link });
            setShowCompose(true);
          }}
        />
      )}
      {showQueue && (
        <ScheduledQueue
          posts={queuePosts}
          accounts={accounts}
          onCancel={handleQueueCancel}
          onRetry={handleQueueRetry}
          onReschedule={handleQueueReschedule}
          onClose={() => setShowQueue(false)}
        />
      )}
    </main>
  );
}
