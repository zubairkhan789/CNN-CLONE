import React, { useState } from 'react';
import { Play, Pause, Volume2, VolumeX, Maximize2, Radio } from 'lucide-react';
import { Article } from '../data/newsData';

interface VideoSectionProps {
  articles: Article[];
  onReadArticle: (article: Article) => void;
}

export const VideoSection: React.FC<VideoSectionProps> = ({ articles, onReadArticle }) => {
  const videoArticles = articles.filter(a => a.videoDuration);
  const [activeVideoIndex, setActiveVideoIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(25);

  const currentArticle = videoArticles[activeVideoIndex] || articles[0];

  const handlePlayToggle = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <section className="mb-12 bg-black text-white rounded-lg p-5 sm:p-7 shadow-lg">
      <div className="flex items-center justify-between border-b border-neutral-800 pb-3 mb-5">
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-[#CC0000] animate-pulse" />
          <h2 className="text-xl sm:text-2xl font-black font-headline uppercase tracking-tight">
            CNN Video Spotlight
          </h2>
        </div>
        <span className="text-xs text-neutral-400 font-mono">
          Featured Broadcast Packages
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        {/* Main Video Screen */}
        <div className="lg:col-span-8 flex flex-col justify-between">
          <div className="relative aspect-[16/9] bg-neutral-900 rounded-md overflow-hidden group">
            <img
              src={currentArticle.imageUrl}
              alt={currentArticle.title}
              referrerPolicy="no-referrer"
              className={`w-full h-full object-cover transition-opacity duration-300 ${
                isPlaying ? 'opacity-90' : 'opacity-70'
              }`}
            />

            {/* Video overlay controls */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20 flex flex-col justify-between p-4 sm:p-6">
              {/* Top status */}
              <div className="flex items-center justify-between">
                <span className="bg-red-600/90 text-white text-[10px] font-bold px-2 py-0.5 rounded tracking-wider uppercase">
                  {isPlaying ? 'PLAYING NOW' : 'ON DEMAND'}
                </span>
                <span className="text-xs font-mono text-neutral-300 bg-black/60 px-2 py-0.5 rounded">
                  {currentArticle.videoDuration || '03:45'}
                </span>
              </div>

              {/* Center Play Button if paused */}
              {!isPlaying && (
                <button
                  onClick={handlePlayToggle}
                  className="self-center w-16 h-16 rounded-full bg-[#CC0000] hover:bg-red-700 text-white flex items-center justify-center shadow-xl transition-transform hover:scale-110 cursor-pointer"
                  aria-label="Play video"
                >
                  <Play className="w-7 h-7 fill-white translate-x-0.5" />
                </button>
              )}

              {/* Bottom Control Bar */}
              <div className="space-y-2">
                <h3 className="text-base sm:text-xl font-bold font-headline text-white line-clamp-2">
                  {currentArticle.title}
                </h3>

                {/* Progress bar */}
                <div 
                  onClick={(e) => {
                    const rect = e.currentTarget.getBoundingClientRect();
                    const clickX = e.clientX - rect.left;
                    setProgress(Math.round((clickX / rect.width) * 100));
                  }}
                  className="w-full h-1.5 bg-neutral-700 rounded-full cursor-pointer relative overflow-hidden"
                >
                  <div
                    className="h-full bg-[#CC0000] transition-all"
                    style={{ width: `${progress}%` }}
                  />
                </div>

                <div className="flex items-center justify-between text-xs text-neutral-300 pt-1">
                  <div className="flex items-center gap-3">
                    <button
                      onClick={handlePlayToggle}
                      className="hover:text-white cursor-pointer"
                      title={isPlaying ? "Pause" : "Play"}
                    >
                      {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-current" />}
                    </button>
                    <button
                      onClick={() => setIsMuted(!isMuted)}
                      className="hover:text-white cursor-pointer"
                      title={isMuted ? "Unmute" : "Mute"}
                    >
                      {isMuted ? <VolumeX className="w-4 h-4 text-red-400" /> : <Volume2 className="w-4 h-4" />}
                    </button>
                    <span className="font-mono text-[11px]">01:12 / {currentArticle.videoDuration || '03:45'}</span>
                  </div>

                  <button
                    onClick={() => onReadArticle(currentArticle)}
                    className="text-xs text-red-400 hover:text-white font-medium underline cursor-pointer"
                  >
                    Read Full Story
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Video Playlist / Up Next */}
        <div className="lg:col-span-4 flex flex-col justify-between border-t lg:border-t-0 lg:border-l border-neutral-800 pt-4 lg:pt-0 lg:pl-6">
          <div className="text-xs font-bold uppercase tracking-wider text-neutral-400 mb-3">
            Up Next in News Video
          </div>

          <div className="space-y-3 overflow-y-auto max-h-[360px] pr-1">
            {videoArticles.map((art, idx) => {
              const isSelected = idx === activeVideoIndex;
              return (
                <div
                  key={art.id}
                  onClick={() => {
                    setActiveVideoIndex(idx);
                    setIsPlaying(true);
                  }}
                  className={`p-2.5 rounded-md cursor-pointer transition-all flex gap-3 items-center border ${
                    isSelected
                      ? 'bg-neutral-800 border-red-600'
                      : 'bg-neutral-900/60 border-neutral-800 hover:bg-neutral-800/80'
                  }`}
                >
                  <div className="relative w-20 h-14 shrink-0 rounded overflow-hidden bg-neutral-950">
                    <img
                      src={art.imageUrl}
                      alt={art.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                      <Play className="w-3.5 h-3.5 text-white fill-white" />
                    </div>
                  </div>

                  <div className="flex-1 min-w-0">
                    <span className="text-[10px] font-mono text-neutral-400 block">
                      {art.videoDuration} · {art.category}
                    </span>
                    <h4 className="text-xs font-semibold text-white truncate-2 leading-snug line-clamp-2">
                      {art.title}
                    </h4>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-4 pt-3 border-t border-neutral-800 text-center">
            <span className="text-xs text-neutral-500">
              Live HD streams encoded via CNN Broadcast Core
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
