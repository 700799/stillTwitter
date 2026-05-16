import type { Tweet } from '@/types';

type Props = {
  tweet: Tweet;
  onPostNow: (t: Tweet) => void;
  onSchedule: (t: Tweet) => void;
  actionLoading: boolean;
};

const CATEGORY_COLORS: Record<string, string> = {
  'Getting Started': 'bg-blue-800 text-blue-100',
  'Slash Commands': 'bg-purple-800 text-purple-100',
  'Tool Use & Permissions': 'bg-orange-800 text-orange-100',
  'Hooks & Automation': 'bg-pink-800 text-pink-100',
  'MCP Servers': 'bg-teal-800 text-teal-100',
  'IDE Integration': 'bg-indigo-800 text-indigo-100',
  'Multi-Agent & Subagents': 'bg-red-800 text-red-100',
  'Productivity Tips': 'bg-green-800 text-green-100',
  'Advanced Features': 'bg-yellow-800 text-yellow-100',
  'Troubleshooting & Best Practices': 'bg-gray-700 text-gray-100',
};

export default function TweetCard({ tweet, onPostNow, onSchedule, actionLoading }: Props) {
  const charRatio = tweet.char_count / 280;
  const charColor =
    charRatio > 0.93
      ? 'text-red-400'
      : charRatio > 0.86
        ? 'text-yellow-400'
        : 'text-gray-500';

  const borderColor = tweet.posted
    ? 'border-green-700'
    : tweet.is_scheduled
      ? 'border-yellow-600'
      : 'border-gray-700';

  return (
    <div className={`bg-gray-900 border ${borderColor} rounded-xl p-4 flex flex-col gap-3 hover:border-gray-500 transition-colors`}>
      <div className="flex items-start justify-between gap-2">
        <span
          className={`text-xs font-medium px-2 py-0.5 rounded-full shrink-0 ${CATEGORY_COLORS[tweet.category] ?? 'bg-gray-700 text-gray-100'}`}
        >
          {tweet.category}
        </span>
        <span className={`text-xs tabular-nums shrink-0 ${charColor}`}>
          {tweet.char_count}/280
        </span>
      </div>

      <p className="text-gray-100 text-sm leading-relaxed flex-1">{tweet.content}</p>

      <div className="flex items-center justify-end gap-2 pt-1">
        {tweet.posted ? (
          <span className="text-xs text-green-400 font-semibold">✓ Posted</span>
        ) : tweet.is_scheduled ? (
          <>
            <span className="text-xs text-yellow-400 font-semibold mr-auto">⏰ Scheduled</span>
            <button
              onClick={() => onPostNow(tweet)}
              disabled={actionLoading}
              className="text-xs bg-blue-600 hover:bg-blue-500 disabled:opacity-50 px-3 py-1.5 rounded-lg font-medium transition-colors"
            >
              Post Now
            </button>
          </>
        ) : (
          <>
            <button
              onClick={() => onPostNow(tweet)}
              disabled={actionLoading}
              className="text-xs bg-blue-600 hover:bg-blue-500 disabled:opacity-50 px-3 py-1.5 rounded-lg font-medium transition-colors"
            >
              Post Now
            </button>
            <button
              onClick={() => onSchedule(tweet)}
              disabled={actionLoading}
              className="text-xs bg-gray-700 hover:bg-gray-600 disabled:opacity-50 px-3 py-1.5 rounded-lg font-medium transition-colors"
            >
              Schedule
            </button>
          </>
        )}
      </div>
    </div>
  );
}
