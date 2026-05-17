import type { Tweet } from '@/types';

type Props = {
  tweet: Tweet;
  onPostNow: (t: Tweet) => void;
  onSchedule: (t: Tweet) => void;
  onCancel: (t: Tweet) => void;
  actionLoading: boolean;
};

const SUBJECT_COLORS: Record<string, string> = {
  'Claude Code Tips': 'bg-blue-800 text-blue-100',
  'Financial Advice': 'bg-green-800 text-green-100',
  'Coaching Stories': 'bg-orange-800 text-orange-100',
  'Science & Math': 'bg-purple-800 text-purple-100',
  'Paradoxes & Dilemmas': 'bg-red-800 text-red-100',
  'Time Management & Study': 'bg-teal-800 text-teal-100',
  'Negotiation': 'bg-yellow-800 text-yellow-100',
  'Business Books': 'bg-pink-800 text-pink-100',
};

export default function TweetCard({ tweet, onPostNow, onSchedule, onCancel, actionLoading }: Props) {
  const borderColor = tweet.posted
    ? 'border-green-700'
    : tweet.is_scheduled
      ? 'border-yellow-600'
      : 'border-gray-700';

  const preview = tweet.parts[0].length > 120
    ? tweet.parts[0].slice(0, 117) + '…'
    : tweet.parts[0];

  return (
    <div className={`bg-gray-900 border ${borderColor} rounded-xl p-4 flex flex-col gap-2 hover:border-gray-500 transition-colors`}>
      {/* Badges row */}
      <div className="flex items-center gap-2 flex-wrap">
        <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${SUBJECT_COLORS[tweet.subject] ?? 'bg-gray-700 text-gray-100'}`}>
          {tweet.subject}
        </span>
        <span className="text-xs text-gray-500">{tweet.category}</span>
        {tweet.is_thread && (
          <span className="ml-auto text-xs bg-gray-700 text-gray-300 px-2 py-0.5 rounded-full">
            🧵 {tweet.part_count}-part thread
          </span>
        )}
      </div>

      {/* Hook title */}
      <h3 className="text-white font-semibold text-sm leading-snug">{tweet.hook}</h3>

      {/* First part preview */}
      <p className="text-gray-400 text-xs leading-relaxed flex-1">{preview}</p>

      {/* Footer */}
      <div className="flex items-center justify-end gap-2 pt-1 border-t border-gray-800">
        {tweet.posted ? (
          <span className="text-xs text-green-400 font-semibold">✓ Posted</span>
        ) : tweet.is_scheduled ? (
          <>
            <span className="text-xs text-yellow-400 font-semibold mr-auto">
              ⏰{' '}
              {tweet.scheduled_at
                ? new Date(tweet.scheduled_at).toLocaleString(undefined, {
                    month: 'short',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                  })
                : 'Scheduled'}
            </span>
            <button
              onClick={() => onPostNow(tweet)}
              disabled={actionLoading}
              className="text-xs bg-blue-600 hover:bg-blue-500 disabled:opacity-50 px-3 py-1.5 rounded-lg font-medium transition-colors"
            >
              Post Now
            </button>
            <button
              onClick={() => onCancel(tweet)}
              disabled={actionLoading}
              className="text-xs bg-gray-700 hover:bg-red-700 disabled:opacity-50 px-3 py-1.5 rounded-lg font-medium transition-colors"
            >
              Cancel
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
