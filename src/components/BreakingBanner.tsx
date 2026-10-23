import React, { useState } from 'react';
import { AlertCircle, ChevronRight, X, Volume2, VolumeX } from 'lucide-react';
import { Article } from '../data/newsData';

interface BreakingBannerProps {
  article: Article;
  onReadArticle: (article: Article) => void;
}

export const BreakingBanner: React.FC<BreakingBannerProps> = ({ article, onReadArticle }) => {
  const [isDismissed, setIsDismissed] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(false);

  if (isDismissed) return null;

  return (
    <div className="bg-[#CC0000] text-white py-2 px-4 lg:px-8 border-b-2 border-red-800 shadow-md transition-all">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
        {/* Left: Breaking tag & Headline */}
        <div 
          onClick={() => onReadArticle(article)}
          className="flex flex-1 items-center gap-2 sm:gap-3 cursor-pointer group min-w-0"
        >
          {/* Breaking News Badge */}
          <div className="flex items-center gap-1.5 shrink-0 bg-black/40 group-hover:bg-black/60 px-2.5 py-1 rounded text-xs font-black tracking-wider uppercase border border-red-400/40 transition-colors">
            <span className="w-2 h-2 rounded-full bg-white animate-ping" />
            <span className="font-headline tracking-widest text-[11px]">Breaking News</span>
          </div>

          {/* Headline */}
          <div className="flex items-center gap-2 truncate">
            <span className="font-semibold text-xs sm:text-sm tracking-tight truncate group-hover:underline">
              {article.title}
            </span>
            <span className="hidden md:inline-flex items-center text-red-200 text-xs shrink-0 group-hover:text-white transition-colors">
              <span>Read story</span>
              <ChevronRight className="w-3.5 h-3.5 ml-0.5" />
            </span>
          </div>
        </div>

        {/* Right Action Controls: Audio alert simulation & Dismiss */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() => setSoundEnabled(!soundEnabled)}
            className="p-1 text-red-200 hover:text-white hover:bg-red-700/60 rounded transition-colors cursor-pointer"
            title={soundEnabled ? "Mute breaking news alerts" : "Enable breaking news sound"}
            aria-label="Toggle alert sound"
          >
            {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4 opacity-70" />}
          </button>

          <button
            onClick={() => setIsDismissed(true)}
            className="p-1 text-red-200 hover:text-white hover:bg-red-700/60 rounded transition-colors cursor-pointer"
            title="Dismiss breaking banner"
            aria-label="Dismiss breaking news banner"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
