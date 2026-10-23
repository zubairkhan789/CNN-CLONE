import React, { useState } from 'react';
import { Radio, RefreshCw, ArrowUpDown } from 'lucide-react';
import { LIVE_UPDATES, LiveUpdate } from '../data/newsData';

export const LiveUpdatesFeed: React.FC = () => {
  const [updates, setUpdates] = useState<LiveUpdate[]>(LIVE_UPDATES);
  const [isNewestFirst, setIsNewestFirst] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [lastRefreshed, setLastRefreshed] = useState('Just now');

  const handleManualRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      // simulate adding a new live flash update
      const sampleNewUpdate: LiveUpdate = {
        id: `lu-${Date.now()}`,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        title: 'Draft resolution language forwarded to plenary committee members for expedited review',
        content: 'Technical advisors report minor wording adjustments in Section 4 were agreed unanimously before noon.',
        reporter: 'CNN News Desk, Atlanta'
      };

      setUpdates(prev => {
        // avoid duplicating if already added recently
        if (prev.some(u => u.title === sampleNewUpdate.title)) return prev;
        return [sampleNewUpdate, ...prev];
      });
      setIsRefreshing(false);
      setLastRefreshed('Updated a moment ago');
    }, 600);
  };

  const sortedUpdates = [...updates].sort((a, b) => {
    return isNewestFirst ? b.id.localeCompare(a.id) : a.id.localeCompare(b.id);
  });

  return (
    <div className="bg-white border border-neutral-200 rounded-md p-4 sm:p-5 shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-neutral-200 gap-2 flex-wrap">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 bg-[#CC0000] text-white px-2 py-0.5 rounded text-[11px] font-bold uppercase tracking-wider">
            <Radio className="w-3 h-3 animate-pulse" />
            <span>Live Feed</span>
          </div>
          <span className="text-xs text-neutral-500 font-mono hidden sm:inline">
            {lastRefreshed}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsNewestFirst(!isNewestFirst)}
            className="flex items-center gap-1 text-xs text-neutral-600 hover:text-black px-2 py-1 rounded hover:bg-neutral-100 transition-colors cursor-pointer border border-neutral-200"
            title="Toggle sort direction"
          >
            <ArrowUpDown className="w-3 h-3" />
            <span>{isNewestFirst ? 'Newest' : 'Oldest'}</span>
          </button>

          <button
            onClick={handleManualRefresh}
            disabled={isRefreshing}
            className="flex items-center gap-1 text-xs font-semibold text-[#CC0000] hover:text-red-700 px-2.5 py-1 rounded hover:bg-red-50 transition-colors cursor-pointer border border-red-200"
            title="Refresh feed"
          >
            <RefreshCw className={`w-3 h-3 ${isRefreshing ? 'animate-spin' : ''}`} />
            <span>Refresh</span>
          </button>
        </div>
      </div>

      {/* Dispatches List */}
      <div className="mt-4 space-y-4">
        {sortedUpdates.map((item) => (
          <div key={item.id} className="relative pl-5 border-l-2 border-red-500 pb-2">
            <div className="absolute -left-[5px] top-1 w-2 h-2 rounded-full bg-[#CC0000]" />
            <div className="flex items-center justify-between text-xs text-neutral-500 mb-1">
              <span className="font-mono font-bold text-neutral-900">{item.time}</span>
              <span className="italic">{item.reporter}</span>
            </div>
            <h4 className="text-sm font-bold text-neutral-900 font-headline leading-tight hover:text-[#CC0000] transition-colors cursor-default">
              {item.title}
            </h4>
            <p className="mt-1 text-xs text-neutral-700 leading-relaxed">
              {item.content}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};
