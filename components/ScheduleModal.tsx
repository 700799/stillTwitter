'use client';

import { useState } from 'react';
import type { Tweet } from '@/types';

type Props = {
  tweet: Tweet;
  onConfirm: (scheduledAt: string) => void;
  onClose: () => void;
};

function defaultDatetime(): string {
  const d = new Date(Date.now() + 60 * 60 * 1000);
  d.setSeconds(0, 0);
  const pad = (n: number) => String(n).padStart(2, '0');
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

function minDatetime(): string {
  const d = new Date(Date.now() + 60 * 1000);
  const pad = (n: number) => String(n).padStart(2, '0');
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

export default function ScheduleModal({ tweet, onConfirm, onClose }: Props) {
  const [scheduledAt, setScheduledAt] = useState(defaultDatetime);

  const handleConfirm = () => {
    if (!scheduledAt) return;
    onConfirm(new Date(scheduledAt).toISOString());
  };

  return (
    <div
      className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="bg-gray-900 border border-gray-700 rounded-2xl p-6 max-w-lg w-full shadow-2xl">
        <h2 className="text-xl font-bold mb-1">Schedule Tweet</h2>
        <p className="text-gray-400 text-xs mb-4">
          Category: <span className="text-gray-300">{tweet.category}</span>
        </p>

        <div className="bg-gray-800 rounded-lg p-3 mb-5">
          <p className="text-gray-100 text-sm leading-relaxed line-clamp-4">{tweet.content}</p>
          <p className="text-gray-500 text-xs mt-2">{tweet.char_count}/280 characters</p>
        </div>

        <div className="mb-6">
          <label className="block text-sm text-gray-400 mb-2">Schedule for</label>
          <input
            type="datetime-local"
            value={scheduledAt}
            min={minDatetime()}
            onChange={(e) => setScheduledAt(e.target.value)}
            className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500 [color-scheme:dark]"
          />
        </div>

        <div className="flex gap-3 justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-gray-700 hover:bg-gray-600 text-sm font-medium transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleConfirm}
            disabled={!scheduledAt}
            className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-sm font-medium transition-colors"
          >
            Schedule Tweet
          </button>
        </div>
      </div>
    </div>
  );
}
