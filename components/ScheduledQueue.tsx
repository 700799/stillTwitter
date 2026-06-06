'use client';

import { useState } from 'react';
import ScheduleModal from './ScheduleModal';
import Drawer from './Drawer';
import type { ScheduledPost, Tweet } from '@/types';

type Props = {
  posts: ScheduledPost[];
  accounts: { id: string; name: string }[];
  onCancel: (scheduledId: number) => void;
  onRetry: (scheduledId: number) => void;
  onReschedule: (post: ScheduledPost, newScheduledAt: string) => void;
  onClose: () => void;
};

function formatTime(iso: string): string {
  return new Date(iso).toLocaleString('en-US', {
    weekday: 'short', month: 'short', day: 'numeric',
    hour: 'numeric', minute: '2-digit', hour12: true,
  });
}

function toMockTweet(post: ScheduledPost): Tweet {
  return {
    id: post.tweet_id,
    subject: post.subject,
    category: post.category,
    hook: post.hook,
    parts: post.parts,
    is_thread: post.parts.length > 1,
    part_count: post.parts.length,
    posted: false,
    posted_at: null,
    twitter_id: null,
    is_scheduled: true,
    scheduled_at: post.scheduled_at,
    created_at: post.created_at,
  };
}

export default function ScheduledQueue({ posts, accounts, onCancel, onRetry, onReschedule, onClose }: Props) {
  const [reschedulePost, setReschedulePost] = useState<ScheduledPost | null>(null);

  const accountName = (id: string) => accounts.find((a) => a.id === id)?.name ?? id;
  const pending = posts.filter((p) => p.status === 'pending');
  const failed = posts.filter((p) => p.status === 'failed');

  const headerExtra = (
    <>
      {pending.length > 0 && (
        <span className="bg-yellow-900 text-yellow-300 text-xs px-2 py-0.5 rounded-full font-medium">
          {pending.length} pending
        </span>
      )}
      {failed.length > 0 && (
        <span className="bg-red-900 text-red-300 text-xs px-2 py-0.5 rounded-full font-medium">
          {failed.length} failed
        </span>
      )}
    </>
  );

  return (
    <>
      <Drawer title="Scheduled Queue" onClose={onClose} headerExtra={headerExtra}>
        {pending.length > 0 && (
          <div>
            {failed.length > 0 && (
              <div className="px-5 py-2 text-xs text-gray-500 font-semibold uppercase tracking-wider border-b border-gray-800">
                Pending
              </div>
            )}
            {pending.map((post) => (
              <div key={post.id} className="px-5 py-4 border-b border-gray-800 last:border-0 flex items-start gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <span className="text-yellow-400 text-xs font-medium">{formatTime(post.scheduled_at)}</span>
                    <span className="text-gray-500 text-xs">·</span>
                    <span className="text-gray-300 text-xs">@{accountName(post.account_id)}</span>
                    <span className="bg-gray-800 text-gray-400 text-xs px-1.5 py-0.5 rounded">{post.subject}</span>
                    {post.parts.length > 1 && (
                      <span className="text-gray-500 text-xs">🧵 {post.parts.length}-part</span>
                    )}
                  </div>
                  <p className="text-white text-sm font-medium truncate">{post.hook}</p>
                  <p className="text-gray-400 text-xs mt-0.5 line-clamp-1">{post.parts[0]}</p>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => setReschedulePost(post)}
                    className="text-xs bg-gray-700 hover:bg-gray-600 px-3 py-1.5 rounded-lg font-medium transition-colors"
                  >
                    Reschedule
                  </button>
                  <button
                    onClick={() => onCancel(post.id)}
                    className="text-xs bg-red-950 hover:bg-red-900 text-red-300 px-3 py-1.5 rounded-lg font-medium transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {failed.length > 0 && (
          <div>
            <div className="px-5 py-2 text-xs text-red-400 font-semibold uppercase tracking-wider border-b border-gray-800 bg-red-950/20">
              Failed
            </div>
            {failed.map((post) => (
              <div key={post.id} className="px-5 py-4 border-b border-gray-800 last:border-0 flex items-start gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <span className="text-red-400 text-xs font-medium">
                      Failed · {formatTime(post.scheduled_at)}
                    </span>
                    <span className="text-gray-500 text-xs">·</span>
                    <span className="text-gray-300 text-xs">@{accountName(post.account_id)}</span>
                  </div>
                  {post.error && (
                    <p className="text-red-300 text-xs mb-1.5 font-mono bg-red-950/40 px-2 py-1 rounded truncate">
                      {post.error}
                    </p>
                  )}
                  <p className="text-white text-sm font-medium truncate">{post.hook}</p>
                  <p className="text-gray-400 text-xs mt-0.5 line-clamp-1">{post.parts[0]}</p>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => onRetry(post.id)}
                    className="text-xs bg-blue-700 hover:bg-blue-600 px-3 py-1.5 rounded-lg font-medium transition-colors"
                  >
                    Retry
                  </button>
                  <button
                    onClick={() => onCancel(post.id)}
                    className="text-xs bg-red-950 hover:bg-red-900 text-red-300 px-3 py-1.5 rounded-lg font-medium transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {posts.length === 0 && (
          <div className="px-5 py-8 text-center text-gray-500 text-sm">No scheduled posts.</div>
        )}
      </Drawer>

      {reschedulePost && (
        <ScheduleModal
          tweet={toMockTweet(reschedulePost)}
          onConfirm={(newAt) => {
            onReschedule(reschedulePost, newAt);
            setReschedulePost(null);
          }}
          onClose={() => setReschedulePost(null)}
        />
      )}
    </>
  );
}
