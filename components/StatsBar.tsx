import type { Stats } from '@/types';

type Props = {
  stats: Stats;
  onScheduledClick?: () => void;
};

export default function StatsBar({ stats, onScheduledClick }: Props) {
  const items = [
    { label: 'Total Tweets', value: stats.total, color: 'bg-blue-900 border-blue-700', onClick: undefined as (() => void) | undefined },
    { label: 'Posted', value: stats.posted, color: 'bg-green-900 border-green-700', onClick: undefined },
    { label: 'Pending', value: stats.pending, color: 'bg-gray-800 border-gray-600', onClick: undefined },
    { label: 'Scheduled', value: stats.scheduled, color: 'bg-yellow-900 border-yellow-700', onClick: onScheduledClick },
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
      {items.map(({ label, value, color, onClick }) =>
        onClick ? (
          <button
            key={label}
            onClick={onClick}
            className={`${color} border rounded-xl p-4 text-center w-full hover:ring-2 ring-yellow-400 transition-all cursor-pointer`}
          >
            <div className="text-4xl font-bold tabular-nums">{value}</div>
            <div className="text-sm text-gray-300 mt-1">{label}</div>
          </button>
        ) : (
          <div key={label} className={`${color} border rounded-xl p-4 text-center`}>
            <div className="text-4xl font-bold tabular-nums">{value}</div>
            <div className="text-sm text-gray-300 mt-1">{label}</div>
          </div>
        )
      )}
    </div>
  );
}
