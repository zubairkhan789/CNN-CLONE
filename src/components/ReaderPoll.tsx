import React, { useState } from 'react';
import { BarChart3, CheckCircle2 } from 'lucide-react';

interface PollOption {
  id: string;
  text: string;
  votes: number;
}

export const ReaderPoll: React.FC = () => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [hasVoted, setHasVoted] = useState(false);
  const [options, setOptions] = useState<PollOption[]>([
    {
      id: 'opt-1',
      text: 'Yes, private capital and technological breakthroughs will meet 2030 climate goals.',
      votes: 1420
    },
    {
      id: 'opt-2',
      text: 'Unlikely, regulatory gridlock and geopolitics remain too challenging.',
      votes: 1980
    },
    {
      id: 'opt-3',
      text: 'Mixed outcome: Grid power will hit targets, but heavy transport will lag.',
      votes: 860
    }
  ]);

  const totalVotes = options.reduce((sum, opt) => sum + opt.votes, 0);

  const handleVote = (optionId: string) => {
    if (hasVoted) return;
    setSelectedOption(optionId);
    setOptions(prev =>
      prev.map(opt =>
        opt.id === optionId ? { ...opt, votes: opt.votes + 1 } : opt
      )
    );
    setHasVoted(true);
  };

  const handleReset = () => {
    if (!selectedOption) return;
    setOptions(prev =>
      prev.map(opt =>
        opt.id === selectedOption ? { ...opt, votes: Math.max(0, opt.votes - 1) } : opt
      )
    );
    setSelectedOption(null);
    setHasVoted(false);
  };

  return (
    <div className="bg-white border border-neutral-200 rounded-md p-5 shadow-sm mb-10">
      <div className="flex items-center justify-between pb-3 border-b border-neutral-200 mb-4">
        <div className="flex items-center gap-2">
          <div className="p-1.5 bg-red-100 text-[#CC0000] rounded">
            <BarChart3 className="w-4 h-4" />
          </div>
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-500">
              CNN Reader Pulse
            </span>
            <h3 className="text-sm font-bold text-neutral-900 font-headline leading-none">
              Daily Editorial Poll
            </h3>
          </div>
        </div>
        <span className="text-xs font-mono text-neutral-500 font-medium">
          {totalVotes.toLocaleString()} votes
        </span>
      </div>

      <p className="text-sm font-semibold text-neutral-800 mb-4 leading-snug">
        In light of the Geneva accord, will global clean industry transition milestones be met by 2030?
      </p>

      <div className="space-y-3">
        {options.map((option) => {
          const percentage = Math.round((option.votes / totalVotes) * 100);
          const isSelected = selectedOption === option.id;

          return (
            <div
              key={option.id}
              onClick={() => !hasVoted && handleVote(option.id)}
              className={`relative overflow-hidden border rounded-md p-3 transition-all ${
                !hasVoted
                  ? 'hover:border-neutral-400 cursor-pointer bg-white'
                  : isSelected
                  ? 'border-[#CC0000] bg-red-50/30'
                  : 'border-neutral-200 bg-neutral-50'
              }`}
            >
              {/* Animated / Rendered Percentage Bar Background */}
              {hasVoted && (
                <div
                  className={`absolute inset-y-0 left-0 transition-all duration-700 ${
                    isSelected ? 'bg-red-100/70' : 'bg-neutral-200/50'
                  }`}
                  style={{ width: `${percentage}%` }}
                />
              )}

              <div className="relative z-10 flex items-start justify-between gap-3">
                <div className="flex items-start gap-2 text-xs sm:text-sm text-neutral-800">
                  {hasVoted && isSelected && (
                    <CheckCircle2 className="w-4 h-4 text-[#CC0000] shrink-0 mt-0.5" />
                  )}
                  <span className={isSelected ? 'font-bold text-neutral-900' : 'font-medium'}>
                    {option.text}
                  </span>
                </div>

                {hasVoted && (
                  <span className="text-xs font-bold font-mono text-neutral-900 shrink-0">
                    {percentage}%
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {hasVoted && (
        <div className="mt-4 pt-3 border-t border-neutral-100 flex items-center justify-between text-xs text-neutral-500">
          <span>Thank you for voting. Results update in real-time.</span>
          <button
            onClick={handleReset}
            className="text-neutral-500 hover:text-black hover:underline cursor-pointer"
          >
            Change vote
          </button>
        </div>
      )}
    </div>
  );
};
