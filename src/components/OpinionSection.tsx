import React from 'react';
import { Quote, ArrowRight, Bookmark } from 'lucide-react';
import { Article } from '../data/newsData';

interface OpinionSectionProps {
  articles: Article[];
  onReadArticle: (article: Article) => void;
  isBookmarked: (id: string) => boolean;
  onToggleBookmark: (article: Article) => void;
}

export const OpinionSection: React.FC<OpinionSectionProps> = ({
  articles,
  onReadArticle,
  isBookmarked,
  onToggleBookmark,
}) => {
  const opinionArticles = articles.filter(a => a.category === 'Opinion' || a.isOpinion);

  return (
    <section className="mb-12 bg-neutral-900 text-white rounded-lg p-6 sm:p-8">
      <div className="flex items-center justify-between border-b border-neutral-800 pb-3 mb-6">
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-red-500 font-mono">
            Analysis & Voices
          </span>
          <h2 className="text-2xl font-black font-headline tracking-tight mt-0.5">
            CNN Opinion
          </h2>
        </div>
        <span className="text-xs text-neutral-400 italic hidden sm:inline">
          Independent commentary and diverse perspectives
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {opinionArticles.map((article) => {
          const bookmarked = isBookmarked(article.id);
          return (
            <div
              key={article.id}
              className="bg-neutral-800/80 hover:bg-neutral-800 border border-neutral-700/60 rounded-md p-5 flex flex-col justify-between transition-colors"
            >
              <div>
                {/* Columnist info */}
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-red-600 shrink-0 bg-neutral-700">
                    <img
                      src={article.authorAvatar || article.imageUrl}
                      alt={article.author}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white leading-tight">
                      {article.author}
                    </h4>
                    <p className="text-[11px] text-neutral-400 line-clamp-1">
                      {article.authorRole}
                    </p>
                  </div>
                </div>

                {/* Big italic quote headline */}
                <div 
                  onClick={() => onReadArticle(article)}
                  className="cursor-pointer group"
                >
                  <Quote className="w-5 h-5 text-red-500 mb-2 rotate-180 opacity-70" />
                  <h3 className="text-lg font-bold font-editorial italic text-neutral-100 group-hover:text-red-400 transition-colors leading-snug">
                    "{article.title}"
                  </h3>
                  <p className="mt-2 text-xs text-neutral-300 line-clamp-3 leading-relaxed">
                    {article.deck}
                  </p>
                </div>
              </div>

              {/* Bottom bar */}
              <div className="mt-5 pt-3 border-t border-neutral-700/80 flex items-center justify-between text-xs text-neutral-400">
                <button
                  onClick={() => onReadArticle(article)}
                  className="text-red-400 hover:text-red-300 font-semibold flex items-center gap-1 cursor-pointer"
                >
                  <span>Read column</span>
                  <ArrowRight className="w-3 h-3" />
                </button>

                <button
                  onClick={() => onToggleBookmark(article)}
                  className="p-1 hover:text-white transition-colors cursor-pointer"
                  title="Save column"
                >
                  <Bookmark className={`w-3.5 h-3.5 ${bookmarked ? 'fill-red-500 text-red-500' : ''}`} />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
