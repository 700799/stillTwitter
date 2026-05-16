import type { Stats } from '@/types';

export default function StatsBar({ stats }: { stats: Stats }) {
  const items = [
    { label: 'Total Tweets', value: stats.total, color: 'bg-blue-900 border-blue-700' },
    { label: 'Posted', value: stats.posted, color: 'bg-green-900 border-green-700' },
    { label: 'Pending', value: stats.pending, color: 'bg-gray-800 border-gray-600' },
    { label: 'Scheduled', value: stats.scheduled, color: 'bg-yellow-900 border-yellow-700' },
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
      {items.map(({ label, value, color }) => (
        <div key={label} className={`${color} border rounded-xl p-4 text-center`}>
          <div className="text-4xl font-bold tabular-nums">{value}</div>
          <div className="text-sm text-gray-300 mt-1">{label}</div>
        </div>
      ))}
    </div>
  );
}
