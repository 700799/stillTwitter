'use client';

import { useState } from 'react';

type AccountMeta = { id: string; name: string };

type Props = {
  accounts: AccountMeta[];
  onClose: () => void;
  onRefresh: () => void;
};

const EMPTY = { id: '', name: '', appKey: '', appSecret: '', accessToken: '', accessSecret: '' };

export default function AccountsModal({ accounts, onClose, onRefresh }: Props) {
  const [form, setForm] = useState(EMPTY);
  const [error, setError] = useState('');
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState('');

  const handleAdd = async () => {
    setSaving(true);
    setError('');
    try {
      const res = await fetch('/api/accounts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) { setError(data.error ?? 'Failed to add account'); return; }
      setForm(EMPTY);
      onRefresh();
    } catch {
      setError('Network error');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm(`Remove account "${id}"?`)) return;
    setDeleting(id);
    try {
      await fetch('/api/accounts', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      });
      onRefresh();
    } finally {
      setDeleting('');
    }
  };

  const field = (key: keyof typeof form, label: string, placeholder: string, type = 'text') => (
    <div key={key}>
      <label className="block text-xs text-gray-400 mb-1">{label}</label>
      <input
        type={type}
        value={form[key]}
        onChange={(e) => setForm((f) => ({ ...f, [key]: e.target.value }))}
        placeholder={placeholder}
        className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-1.5 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-blue-500"
      />
    </div>
  );

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-900 border border-gray-700 rounded-2xl p-6 max-w-lg w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-xl font-bold">Twitter Accounts</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white text-xl leading-none">×</button>
        </div>

        {/* Current accounts */}
        {accounts.length > 0 && (
          <div className="mb-6 space-y-2">
            {accounts.map((a) => (
              <div key={a.id} className="flex items-center justify-between bg-gray-800 rounded-lg px-4 py-2">
                <div>
                  <div className="text-sm font-medium text-white">{a.name}</div>
                  <div className="text-xs text-gray-400">id: {a.id}</div>
                </div>
                <button
                  onClick={() => handleDelete(a.id)}
                  disabled={deleting === a.id}
                  className="text-xs text-red-400 hover:text-red-300 disabled:opacity-50"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Add account form */}
        <h3 className="text-sm font-semibold text-gray-300 mb-3">Add Account</h3>
        <p className="text-xs text-gray-500 mb-4">
          Get credentials from{' '}
          <span className="text-blue-400">developer.twitter.com</span>{' '}
          — your app must have <strong>Read and Write</strong> permissions.
        </p>

        {error && (
          <div className="bg-red-950 border border-red-700 text-red-300 text-sm px-3 py-2 rounded-lg mb-4">
            {error}
          </div>
        )}

        <div className="space-y-3">
          {field('id', 'Unique ID (slug)', 'e.g. main_account')}
          {field('name', 'Display Name', 'e.g. @myhandle')}
          {field('appKey', 'API Key (Consumer Key)', 'xxxxxxxxxxxxxxxx')}
          {field('appSecret', 'API Secret (Consumer Secret)', 'xxxxxxxxxxxxxxxx', 'password')}
          {field('accessToken', 'Access Token', 'xxxxxxxxxxxxxxxx-xxxxxxxxxxxxxxxx')}
          {field('accessSecret', 'Access Token Secret', 'xxxxxxxxxxxxxxxx', 'password')}
        </div>

        <div className="flex gap-3 mt-5 justify-end">
          <button onClick={onClose} className="px-4 py-2 rounded-lg bg-gray-700 hover:bg-gray-600 text-sm font-medium transition-colors">
            Close
          </button>
          <button
            onClick={handleAdd}
            disabled={saving}
            className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-sm font-medium transition-colors"
          >
            {saving ? 'Saving…' : 'Add Account'}
          </button>
        </div>
      </div>
    </div>
  );
}
