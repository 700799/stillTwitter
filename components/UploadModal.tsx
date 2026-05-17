'use client';

import { useState, useRef } from 'react';

type Props = {
  onClose: () => void;
  onSuccess: () => void;
};

type ParsedResult = {
  count: number;
  subjects: Record<string, number>;
  data: unknown[];
};

export default function UploadModal({ onClose, onSuccess }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [parsed, setParsed] = useState<ParsedResult | null>(null);
  const [parseError, setParseError] = useState('');
  const [uploading, setUploading] = useState(false);
  const [result, setResult] = useState<{ imported: number; skipped: number; details: string[] } | null>(null);

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setParsed(null);
    setParseError('');
    setResult(null);

    const reader = new FileReader();
    reader.onload = (ev) => {
      try {
        const data = JSON.parse(ev.target?.result as string);
        if (!Array.isArray(data)) throw new Error('JSON must be an array');
        const subjects: Record<string, number> = {};
        for (const item of data) {
          const s = item.subject ?? 'Unknown';
          subjects[s] = (subjects[s] ?? 0) + 1;
        }
        setParsed({ count: data.length, subjects, data });
      } catch (err) {
        setParseError(String(err));
      }
    };
    reader.readAsText(file);
  };

  const handleUpload = async () => {
    if (!parsed) return;
    setUploading(true);
    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(parsed.data),
      });
      const data = await res.json();
      setResult(data);
      if (data.imported > 0) onSuccess();
    } catch {
      setParseError('Network error during upload');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-900 border border-gray-700 rounded-2xl p-6 max-w-lg w-full">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-xl font-bold">Upload Tweets (JSON)</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white text-xl leading-none">×</button>
        </div>

        <div className="bg-gray-800 rounded-lg p-4 mb-5 text-xs text-gray-400 font-mono leading-relaxed">
          {`[
  {
    "subject": "Financial Advice",
    "category": "401k",
    "hook": "The $50K mistake at 35",
    "parts": ["Tweet text ≤280 chars", "Thread part 2…"]
  }
]`}
        </div>

        <input
          ref={inputRef}
          type="file"
          accept=".json"
          onChange={handleFile}
          className="hidden"
        />

        {!parsed && !result && (
          <button
            onClick={() => inputRef.current?.click()}
            className="w-full border-2 border-dashed border-gray-600 hover:border-blue-500 rounded-xl py-8 text-gray-400 hover:text-white transition-colors text-sm"
          >
            Click to choose a JSON file
          </button>
        )}

        {parseError && (
          <div className="bg-red-950 border border-red-700 text-red-300 text-sm px-3 py-2 rounded-lg mt-3">
            {parseError}
          </div>
        )}

        {parsed && !result && (
          <div className="bg-gray-800 rounded-lg p-4 mt-3">
            <div className="text-sm font-semibold text-white mb-2">{parsed.count} entries ready</div>
            <div className="space-y-1">
              {Object.entries(parsed.subjects).map(([s, n]) => (
                <div key={s} className="flex justify-between text-xs text-gray-400">
                  <span>{s}</span><span>{n}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {result && (
          <div className="bg-gray-800 rounded-lg p-4 mt-3">
            <div className="text-sm font-semibold text-green-400 mb-1">
              ✓ Imported {result.imported} tweets
            </div>
            {result.skipped > 0 && (
              <div className="text-xs text-yellow-400">{result.skipped} entries skipped (see below)</div>
            )}
            {result.details?.length > 0 && (
              <details className="mt-2">
                <summary className="text-xs text-gray-500 cursor-pointer">Validation errors</summary>
                <div className="text-xs text-red-400 mt-1 space-y-0.5">
                  {result.details.map((d, i) => <div key={i}>{d}</div>)}
                </div>
              </details>
            )}
          </div>
        )}

        <div className="flex gap-3 mt-5 justify-end">
          <button onClick={onClose} className="px-4 py-2 rounded-lg bg-gray-700 hover:bg-gray-600 text-sm font-medium transition-colors">
            {result ? 'Done' : 'Cancel'}
          </button>
          {parsed && !result && (
            <button
              onClick={handleUpload}
              disabled={uploading}
              className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-sm font-medium transition-colors"
            >
              {uploading ? 'Uploading…' : `Import ${parsed.count} tweets`}
            </button>
          )}
          {result && (
            <button
              onClick={() => { setParsed(null); setResult(null); if (inputRef.current) inputRef.current.value = ''; }}
              className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-sm font-medium transition-colors"
            >
              Upload More
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
