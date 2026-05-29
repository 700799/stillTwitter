'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import type { NewsSource, NewsDigest } from '@/types';

const CATEGORIES = ['National', 'Northeast', 'Southeast', 'Midwest', 'Southwest', 'West', 'Custom'];

export default function AdminPage() {
  const [sources, setSources] = useState<NewsSource[]>([]);
  const [digest, setDigest] = useState<NewsDigest | null>(null);
  const [loading, setLoading] = useState(true);
  const [generating, setGenerating] = useState(false);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState<'success' | 'error'>('success');
  const [newName, setNewName] = useState('');
  const [newUrl, setNewUrl] = useState('');
  const [newCategory, setNewCategory] = useState('Custom');

  const fetchSources = useCallback(async () => {
    const res = await fetch('/api/admin/news-sources');
    const data = await res.json();
    setSources(data.sources ?? []);
  }, []);

  const fetchDigest = useCallback(async () => {
    const res = await fetch('/api/admin/digest');
    const data = await res.json();
    setDigest(data.digest ?? null);
  }, []);

  useEffect(() => {
    Promise.all([fetchSources(), fetchDigest()]).finally(() => setLoading(false));
  }, [fetchSources, fetchDigest]);

  const handleToggle = async (id: number) => {
    await fetch(`/api/admin/news-sources/${id}`, { method: 'PATCH' });
    await fetchSources();
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Delete this source?')) return;
    await fetch(`/api/admin/news-sources/${id}`, { method: 'DELETE' });
    await fetchSources();
  };

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim() || !newUrl.trim()) return;
    const res = await fetch('/api/admin/news-sources', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: newName.trim(), url: newUrl.trim(), category: newCategory }),
    });
    if (res.ok) {
      setNewName('');
      setNewUrl('');
      await fetchSources();
    }
  };

  const handleGenerate = async () => {
    setGenerating(true);
    setMessage('');
    try {
      const res = await fetch('/api/admin/digest', { method: 'POST' });
      const data = await res.json();
      if (res.ok) {
        setMessageType('success');
        setMessage(data.alreadyExists ? 'Digest already exists for today.' : `Generated ${data.count} articles.`);
        await fetchDigest();
      } else {
        setMessageType('error');
        setMessage(data.error ?? 'Failed to generate digest.');
      }
    } catch {
      setMessageType('error');
      setMessage('Network error.');
    } finally {
      setGenerating(false);
    }
  };

  const grouped = Object.fromEntries(CATEGORIES.map((c) => [c, [] as NewsSource[]]));
  const knownCats = new Set(CATEGORIES);
  for (const s of sources) {
    if (knownCats.has(s.category)) grouped[s.category].push(s);
    else { if (!grouped['Other']) grouped['Other'] = []; grouped['Other'].push(s); }
  }

  const activeCount = sources.filter((s) => s.active).length;

  return (
    <main className="max-w-5xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white">News Sources</h1>
          <p className="text-gray-400 text-sm mt-1">
            {sources.length} sources · {activeCount} active
          </p>
        </div>
        <Link href="/" className="text-sm text-gray-400 hover:text-white transition-colors">
          ← Dashboard
        </Link>
      </div>

      {/* Digest status bar */}
      <div className="bg-gray-900 border border-gray-700 rounded-2xl p-5 mb-8 flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="text-sm font-semibold text-white">Daily Digest</div>
          {digest ? (
            <div className="text-xs text-gray-400 mt-1">
              Last: {digest.date} · {digest.articles.length} articles
              {digest.email_sent && <span className="ml-2 text-green-400">· Email sent</span>}
            </div>
          ) : (
            <div className="text-xs text-gray-400 mt-1">No digest generated yet</div>
          )}
        </div>
        <div className="flex items-center gap-3">
          {message && (
            <span className={`text-xs ${messageType === 'success' ? 'text-green-400' : 'text-red-400'}`}>
              {message}
            </span>
          )}
          <button
            onClick={handleGenerate}
            disabled={generating}
            className="text-sm bg-blue-600 hover:bg-blue-500 disabled:opacity-50 px-4 py-2 rounded-lg font-medium transition-colors"
          >
            {generating ? 'Generating…' : 'Generate Digest Now'}
          </button>
        </div>
      </div>

      {/* Sources table */}
      {loading ? (
        <div className="text-gray-500 text-sm py-8">Loading sources…</div>
      ) : (
        <div className="bg-gray-900 border border-gray-700 rounded-2xl overflow-hidden mb-8">
          {[...CATEGORIES, 'Other'].map((category) => {
            const list = grouped[category];
            if (!list || list.length === 0) return null;
            return (
              <div key={category}>
                <div className="px-5 py-2 text-xs text-gray-500 font-semibold uppercase tracking-wider bg-gray-800/50 border-b border-gray-700">
                  {category}
                </div>
                {list.map((source) => (
                  <div
                    key={source.id}
                    className="flex items-center gap-4 px-5 py-3.5 border-b border-gray-800 last:border-0 hover:bg-gray-800/20 transition-colors"
                  >
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-white text-sm font-medium">{source.name}</span>
                        {source.active && (
                          <span className="text-xs bg-green-900 text-green-300 px-1.5 py-0.5 rounded-full font-medium">
                            active
                          </span>
                        )}
                      </div>
                      <p className="text-gray-500 text-xs font-mono truncate mt-0.5">{source.url}</p>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        onClick={() => handleToggle(source.id)}
                        className={`text-xs px-3 py-1.5 rounded-lg font-medium transition-colors ${
                          source.active
                            ? 'bg-gray-700 hover:bg-gray-600 text-gray-300'
                            : 'bg-green-900/40 hover:bg-green-900/70 text-green-300'
                        }`}
                      >
                        {source.active ? 'Disable' : 'Enable'}
                      </button>
                      <button
                        onClick={() => handleDelete(source.id)}
                        className="text-xs bg-red-950 hover:bg-red-900 text-red-400 px-3 py-1.5 rounded-lg font-medium transition-colors"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            );
          })}
        </div>
      )}

      {/* Add source form */}
      <div className="bg-gray-900 border border-gray-700 rounded-2xl p-5">
        <h2 className="text-base font-semibold text-white mb-4">Add Custom Source</h2>
        <form onSubmit={handleAdd} className="flex flex-col sm:flex-row gap-3">
          <input
            type="text"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            placeholder="Source name"
            required
            className="flex-1 bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white text-sm placeholder-gray-500 focus:outline-none focus:border-blue-500"
          />
          <input
            type="url"
            value={newUrl}
            onChange={(e) => setNewUrl(e.target.value)}
            placeholder="RSS feed URL"
            required
            className="flex-[2] bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white text-sm placeholder-gray-500 focus:outline-none focus:border-blue-500"
          />
          <select
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
            className="bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-blue-500"
          >
            {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
          <button
            type="submit"
            className="text-sm bg-blue-600 hover:bg-blue-500 px-5 py-2 rounded-lg font-medium transition-colors whitespace-nowrap"
          >
            Add Source
          </button>
        </form>
      </div>
    </main>
  );
}
