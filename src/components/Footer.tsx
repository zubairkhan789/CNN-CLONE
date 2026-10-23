import React, { useState } from 'react';
import { Mail, Check, ArrowRight } from 'lucide-react';
import { CategoryType } from '../data/newsData';

interface FooterProps {
  onSelectCategory: (category: CategoryType) => void;
}

export const Footer: React.FC<FooterProps> = ({ onSelectCategory }) => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim() && email.includes('@')) {
      setIsSubscribed(true);
      setTimeout(() => {
        setIsSubscribed(false);
        setEmail('');
      }, 5000);
    }
  };

  return (
    <footer className="bg-[#0c0c0c] text-white border-t-4 border-[#CC0000] pt-12 pb-8 px-4 lg:px-8 mt-16">
      <div className="max-w-7xl mx-auto">
        {/* Top Newsletter & Brand row */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pb-10 border-b border-neutral-800">
          <div className="lg:col-span-5">
            <div className="flex items-center gap-2 mb-3">
              <div className="bg-[#CC0000] px-3 py-1.5 rounded-xs inline-block">
                <span className="text-white font-black text-2xl font-headline tracking-tighter">
                  CNN
                </span>
              </div>
              <span className="text-xs uppercase tracking-widest text-neutral-400 font-bold">
                Daily Intelligence
              </span>
            </div>
            <p className="text-sm text-neutral-400 leading-relaxed max-w-sm">
              The world's most trusted source for breaking journalism, deep investigations, and live global coverage.
            </p>
          </div>

          {/* Newsletter Box */}
          <div className="lg:col-span-7 bg-neutral-900 p-5 rounded-lg border border-neutral-800">
            <h3 className="text-sm font-bold font-headline uppercase tracking-wider text-white mb-1 flex items-center gap-2">
              <Mail className="w-4 h-4 text-[#CC0000]" />
              Subscribe to CNN 5 Things Newsletter
            </h3>
            <p className="text-xs text-neutral-400 mb-3">
              Get the five news stories you need to know each morning in your inbox.
            </p>

            <form onSubmit={handleSubscribe} className="flex gap-2 max-w-md">
              <input
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="flex-1 bg-black border border-neutral-700 text-xs text-white px-3 py-2 rounded focus:outline-none focus:border-[#CC0000]"
              />
              <button
                type="submit"
                className="bg-[#CC0000] hover:bg-red-700 text-white text-xs font-bold px-4 py-2 rounded transition-colors cursor-pointer flex items-center gap-1 shrink-0"
              >
                {isSubscribed ? (
                  <>
                    <Check className="w-3.5 h-3.5" />
                    <span>Subscribed!</span>
                  </>
                ) : (
                  <>
                    <span>Sign Up</span>
                    <ArrowRight className="w-3 h-3" />
                  </>
                )}
              </button>
            </form>
            {isSubscribed && (
              <p className="text-xs text-emerald-400 mt-2 font-medium">
                Thank you! You have been subscribed to CNN 5 Things.
              </p>
            )}
          </div>
        </div>

        {/* Navigation Sitemap Columns */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6 py-10 border-b border-neutral-800 text-xs">
          <div>
            <h4 className="font-bold text-neutral-200 uppercase tracking-wider mb-3">
              World & Politics
            </h4>
            <ul className="space-y-2 text-neutral-400">
              <li>
                <button onClick={() => onSelectCategory('World')} className="hover:text-white cursor-pointer">
                  World News
                </button>
              </li>
              <li>
                <button onClick={() => onSelectCategory('US Politics')} className="hover:text-white cursor-pointer">
                  US Politics
                </button>
              </li>
              <li>
                <button onClick={() => onSelectCategory('World')} className="hover:text-white cursor-pointer">
                  Europe & Middle East
                </button>
              </li>
              <li>
                <button onClick={() => onSelectCategory('World')} className="hover:text-white cursor-pointer">
                  Asia Pacific
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-neutral-200 uppercase tracking-wider mb-3">
              Business & Tech
            </h4>
            <ul className="space-y-2 text-neutral-400">
              <li>
                <button onClick={() => onSelectCategory('Business')} className="hover:text-white cursor-pointer">
                  Markets & Indices
                </button>
              </li>
              <li>
                <button onClick={() => onSelectCategory('Tech')} className="hover:text-white cursor-pointer">
                  AI & Innovation
                </button>
              </li>
              <li>
                <button onClick={() => onSelectCategory('Tech')} className="hover:text-white cursor-pointer">
                  Aerospace
                </button>
              </li>
              <li>
                <button onClick={() => onSelectCategory('Business')} className="hover:text-white cursor-pointer">
                  Global Energy
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-neutral-200 uppercase tracking-wider mb-3">
              Science & Climate
            </h4>
            <ul className="space-y-2 text-neutral-400">
              <li>
                <button onClick={() => onSelectCategory('Climate')} className="hover:text-white cursor-pointer">
                  Clean Tech
                </button>
              </li>
              <li>
                <button onClick={() => onSelectCategory('Climate')} className="hover:text-white cursor-pointer">
                  Ocean Conservation
                </button>
              </li>
              <li>
                <button onClick={() => onSelectCategory('Climate')} className="hover:text-white cursor-pointer">
                  Global Weather
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-neutral-200 uppercase tracking-wider mb-3">
              Culture & Sport
            </h4>
            <ul className="space-y-2 text-neutral-400">
              <li>
                <button onClick={() => onSelectCategory('Entertainment')} className="hover:text-white cursor-pointer">
                  Entertainment
                </button>
              </li>
              <li>
                <button onClick={() => onSelectCategory('Sports')} className="hover:text-white cursor-pointer">
                  Champions League
                </button>
              </li>
              <li>
                <button onClick={() => onSelectCategory('Sports')} className="hover:text-white cursor-pointer">
                  Motorsport & Tennis
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-neutral-200 uppercase tracking-wider mb-3">
              Opinion & Analysis
            </h4>
            <ul className="space-y-2 text-neutral-400">
              <li>
                <button onClick={() => onSelectCategory('Opinion')} className="hover:text-white cursor-pointer">
                  Editorial Columnists
                </button>
              </li>
              <li>
                <button onClick={() => onSelectCategory('Opinion')} className="hover:text-white cursor-pointer">
                  Fareed Zakaria GPS
                </button>
              </li>
              <li>
                <button onClick={() => onSelectCategory('Opinion')} className="hover:text-white cursor-pointer">
                  Fact Checks
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Legal & Copyright */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-[11px] text-neutral-500">
          <p>
            © 2026 Cable News Network. A Warner Bros. Discovery Company. All Rights Reserved. CNN Sans ™ & © 2026 Cable News Network.
          </p>

          <div className="flex flex-wrap items-center gap-4">
            <span className="hover:text-neutral-300 cursor-pointer">Privacy Policy</span>
            <span className="hover:text-neutral-300 cursor-pointer">Terms of Use</span>
            <span className="hover:text-neutral-300 cursor-pointer">Ad Choices</span>
            <span className="hover:text-neutral-300 cursor-pointer">Accessibility</span>
            <span className="hover:text-neutral-300 cursor-pointer">Help & Contact</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
