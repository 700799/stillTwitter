'use client';

import type { ReactNode } from 'react';

type Props = {
  title: string;
  onClose: () => void;
  width?: 'md' | 'lg';
  headerExtra?: ReactNode;
  children: ReactNode;
};

export default function Drawer({ title, onClose, width = 'md', headerExtra, children }: Props) {
  const widthClass = width === 'lg' ? 'max-w-2xl' : 'max-w-md';

  return (
    <div className="fixed inset-0 z-50 flex">
      <div className="flex-1 bg-black/60" onClick={onClose} />
      <div className={`${widthClass} w-full bg-gray-900 border-l border-gray-700 shadow-2xl flex flex-col animate-slide-in-right`}>
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-700 shrink-0">
          <div className="flex items-center gap-3 min-w-0">
            <h2 className="text-white font-semibold text-base truncate">{title}</h2>
            {headerExtra}
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white text-xl leading-none font-bold px-1 shrink-0 ml-2"
            aria-label="Close"
          >
            ×
          </button>
        </div>
        <div className="flex-1 overflow-y-auto">
          {children}
        </div>
      </div>
    </div>
  );
}
