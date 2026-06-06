'use client';

import { useState } from 'react';
import { SUBJECTS } from '@/data/constants';
import Drawer from './Drawer';

type Account = { id: string; name: string };

type Props = {
  accounts: Account[];
  selectedAccountId: string;
  onClose: () => void;
  onSuccess: () => void;
  initialHook?: string;
  initialContent?: string;
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

const charColor = (len: number) =>
  len > 280 ? 'text-red-400' : len > 240 ? 'text-yellow-400' : 'text-gray-500';

export default function ComposeModal({ accounts, selectedAccountId, onClose, onSuccess, initialHook, initialContent }: Props) {
  const [subject, setSubject] = useState<string>(SUBJECTS[0]);
  const [category, setCategory] = useState('');
  const [hook, setHook] = useState(initialHook ?? '');
  const [parts, setParts] = useState(initialContent ? [initialContent] : ['']);
  const [action, setAction] = useState<'draft' | 'schedule' | 'post'>('schedule');
  const [scheduledAt, setScheduledAt] = useState(defaultDatetime);
  const [accountId, setAccountId] = useState(selectedAccountId || accounts[0]?.id || '');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const updatePart = (i: number, val: string) => {
    setParts((prev) => prev.map((p, idx) => (idx === i ? val : p)));
  };

  const addPart = () => {
    if (parts.length < 4) setParts((prev) => [...prev, '']);
  };

  const removePart = (i: number) => {
    setParts((prev) => prev.filter((_, idx) => idx !== i));
  };

  const isValid =
    hook.trim().length > 0 &&
    category.trim().length > 0 &&
    parts.every((p) => p.trim().length > 0 && p.length <= 280) &&
    (action !== 'schedule' || scheduledAt) &&
    (action === 'draft' || accountId);

  const handleSubmit = async () => {
    if (!isValid) return;
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/compose', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          subject,
          category: category.trim(),
          hook: hook.trim(),
          parts: parts.map((p) => p.trim()),
          action,
          scheduledAt: action === 'schedule' ? new Date(scheduledAt).toISOString() : undefined,
          accountId: action !== 'draft' ? accountId : undefined,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? 'Failed to save tweet.');
      } else {
        onSuccess();
        onClose();
      }
    } catch {
      setError('Network error.');
    } finally {
      setLoading(false);
    }
  };

  const actionLabel = action === 'draft' ? 'Save Draft' : action === 'schedule' ? 'Schedule Tweet' : 'Post Now';

  return (
    <Drawer title="Compose Tweet" onClose={onClose} width="lg">
      <div className="p-5">
        {/* Subject + Category */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          <div>
            <label className="block text-xs text-gray-400 mb-1.5">Subject</label>
            <select
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-blue-500"
            >
              {SUBJECTS.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-xs text-gray-400 mb-1.5">Category</label>
            <input
              type="text"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              placeholder="e.g. Productivity Tips"
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white text-sm placeholder-gray-500 focus:outline-none focus:border-blue-500"
            />
          </div>
        </div>

        {/* Hook */}
        <div className="mb-4">
          <div className="flex items-center justify-between mb-1.5">
            <label className="text-xs text-gray-400">Hook (card title)</label>
            <span className={`text-xs ${charColor(hook.length)}`}>{hook.length}</span>
          </div>
          <input
            type="text"
            value={hook}
            onChange={(e) => setHook(e.target.value)}
            placeholder="A compelling headline that makes people stop scrolling…"
            className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white text-sm placeholder-gray-500 focus:outline-none focus:border-blue-500"
          />
        </div>

        {/* Thread parts */}
        <div className="mb-4">
          <label className="block text-xs text-gray-400 mb-1.5">
            Tweet{parts.length > 1 ? ` Thread (${parts.length} parts)` : ' Content'}
          </label>
          <div className="space-y-2">
            {parts.map((p, i) => (
              <div key={i} className="relative">
                <textarea
                  value={p}
                  onChange={(e) => updatePart(i, e.target.value)}
                  placeholder={i === 0 ? 'First tweet…' : `Part ${i + 1}…`}
                  rows={3}
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white text-sm placeholder-gray-500 focus:outline-none focus:border-blue-500 resize-none pr-16"
                />
                <div className="absolute bottom-2 right-2 flex items-center gap-2">
                  <span className={`text-xs ${charColor(p.length)}`}>{p.length}/280</span>
                  {parts.length > 1 && (
                    <button
                      onClick={() => removePart(i)}
                      className="text-gray-500 hover:text-red-400 text-sm leading-none"
                      title="Remove part"
                    >
                      ×
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
          {parts.length < 4 && (
            <button
              onClick={addPart}
              className="mt-2 text-xs text-blue-400 hover:text-blue-300 transition-colors"
            >
              + Add thread part
            </button>
          )}
        </div>

        {/* Action */}
        <div className="mb-4">
          <label className="block text-xs text-gray-400 mb-1.5">Action</label>
          <div className="flex gap-2">
            {(['draft', 'schedule', 'post'] as const).map((a) => (
              <button
                key={a}
                onClick={() => setAction(a)}
                className={`text-sm px-3 py-1.5 rounded-lg font-medium transition-colors capitalize ${
                  action === a ? 'bg-blue-600 text-white' : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                }`}
              >
                {a === 'draft' ? 'Save Draft' : a === 'schedule' ? 'Schedule' : 'Post Now'}
              </button>
            ))}
          </div>
        </div>

        {/* Schedule datetime */}
        {action === 'schedule' && (
          <div className="mb-4">
            <label className="block text-xs text-gray-400 mb-1.5">Schedule for</label>
            <input
              type="datetime-local"
              value={scheduledAt}
              min={minDatetime()}
              onChange={(e) => setScheduledAt(e.target.value)}
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-blue-500 [color-scheme:dark]"
            />
          </div>
        )}

        {/* Account selector (schedule/post) */}
        {action !== 'draft' && (
          <div className="mb-5">
            <label className="block text-xs text-gray-400 mb-1.5">Account</label>
            {accounts.length === 0 ? (
              <p className="text-yellow-400 text-xs">No accounts configured. Add one via Accounts.</p>
            ) : (
              <select
                value={accountId}
                onChange={(e) => setAccountId(e.target.value)}
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-blue-500"
              >
                {accounts.map((a) => (
                  <option key={a.id} value={a.id}>{a.name}</option>
                ))}
              </select>
            )}
          </div>
        )}

        {error && <p className="text-red-400 text-sm mb-4">{error}</p>}

        <div className="flex gap-3 justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-gray-700 hover:bg-gray-600 text-sm font-medium transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={!isValid || loading}
            className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-sm font-medium transition-colors"
          >
            {loading ? 'Saving…' : actionLabel}
          </button>
        </div>
      </div>
    </Drawer>
  );
}
