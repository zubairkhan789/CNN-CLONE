import React, { useState } from 'react';
import { X, Tv, Volume2, VolumeX, Maximize2, Radio } from 'lucide-react';

interface LiveTvModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const LiveTvModal: React.FC<LiveTvModalProps> = ({ isOpen, onClose }) => {
  const [isMuted, setIsMuted] = useState(false);
  const [selectedChannel, setSelectedChannel] = useState<'CNN US' | 'CNN International' | 'HLN'>('CNN US');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        onClick={onClose}
        className="fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity" 
      />

      <div className="relative w-full max-w-4xl bg-black rounded-lg overflow-hidden border border-neutral-800 shadow-2xl z-10 flex flex-col">
        {/* Top bar */}
        <div className="bg-neutral-900 px-4 py-2.5 flex items-center justify-between border-b border-neutral-800 text-white">
          <div className="flex items-center gap-3">
            <div className="bg-[#CC0000] px-2 py-0.5 rounded text-xs font-black font-headline tracking-tight">
              CNN
            </div>
            <div className="flex items-center gap-1.5 text-xs font-bold text-red-500 uppercase tracking-widest">
              <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
              <span>Live Broadcast</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {(['CNN US', 'CNN International', 'HLN'] as const).map(channel => (
              <button
                key={channel}
                onClick={() => setSelectedChannel(channel)}
                className={`text-xs px-2.5 py-1 rounded font-semibold transition-colors cursor-pointer ${
                  selectedChannel === channel
                    ? 'bg-white text-black'
                    : 'text-neutral-400 hover:text-white bg-neutral-800'
                }`}
              >
                {channel}
              </button>
            ))}

            <button
              onClick={onClose}
              className="p-1 text-neutral-400 hover:text-white hover:bg-neutral-800 rounded ml-2 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Video feed container */}
        <div className="relative aspect-video bg-neutral-950 flex items-center justify-center overflow-hidden">
          <img
            src="/src/assets/images/cnn_lead_diplomacy_1792739459927.jpg"
            alt="Live feed"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover opacity-85"
          />

          {/* Authentic Cable News Lower-Third Chyrons */}
          <div className="absolute inset-x-0 bottom-0 p-4 sm:p-6 bg-gradient-to-t from-black via-black/80 to-transparent">
            {/* Live chyron badge */}
            <div className="flex items-center gap-2 mb-1.5">
              <div className="bg-[#CC0000] text-white text-xs font-black px-2 py-0.5 tracking-wider uppercase">
                LIVE · GENEVA
              </div>
              <div className="bg-black/80 text-white text-xs font-bold px-2 py-0.5 tracking-wider uppercase font-mono">
                12:08 PM EDT
              </div>
            </div>

            {/* Headline ticker bar */}
            <div className="bg-neutral-900 border-l-4 border-[#CC0000] text-white p-2.5 rounded-sm shadow-md">
              <p className="text-sm sm:text-base font-bold font-headline leading-tight">
                GENEVA SUMMIT ACCORD SIGNED: 42 NATIONS UNIFY CLEAN INDUSTRIAL ENERGY CORRIDORS
              </p>
              <p className="text-xs text-neutral-400 mt-0.5">
                Chief Diplomatic Correspondent reporting live from plenary hall
              </p>
            </div>
          </div>

          {/* Floating audio control */}
          <div className="absolute top-4 right-4 flex items-center gap-2 bg-black/60 backdrop-blur-xs p-1.5 rounded text-white text-xs">
            <button
              onClick={() => setIsMuted(!isMuted)}
              className="p-1 hover:text-red-400 cursor-pointer"
              title={isMuted ? "Unmute" : "Mute"}
            >
              {isMuted ? <VolumeX className="w-4 h-4 text-red-500" /> : <Volume2 className="w-4 h-4" />}
            </button>
            <span className="font-mono text-[11px] pr-1.5">1080p HD</span>
          </div>
        </div>

        {/* Channel Schedule Footer */}
        <div className="bg-neutral-900 px-4 py-3 border-t border-neutral-800 text-xs text-neutral-400 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Radio className="w-3.5 h-3.5 text-red-500" />
            <span className="text-white font-medium">The Situation Room with Wolf Blitzer</span>
            <span className="text-neutral-500">· Live from Washington</span>
          </div>
          <span className="font-mono text-neutral-500">Stream ID: CNN-LIVE-2026</span>
        </div>
      </div>
    </div>
  );
};
