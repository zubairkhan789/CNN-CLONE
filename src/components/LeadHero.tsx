import React from 'react';
import { Bookmark, Clock, ArrowRight, Radio } from 'lucide-react';
import { Article } from '../data/newsData';

interface LeadHeroProps {
  leadArticle: Article;
  secondaryArticles: Article[];
  onReadArticle: (article: Article) => void;
  isBookmarked: (id: string) => boolean;
  onToggleBookmark: (article: Article) => void;
}

export const LeadHero: React.FC<LeadHeroProps> = ({
  leadArticle,
  secondaryArticles,
  onReadArticle,
  isBookmarked,
  onToggleBookmark,
}) => {
  return (
    <section className="mb-10">
      {/* 2-Column Desktop Grid for CNN Lead Story + Flanking Top Headlines */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Main Lead Story (Takes 8 columns on desktop) */}
        <div className="lg:col-span-8 flex flex-col">
          {/* Lead Headline Header */}
          <div className="mb-4">
            <div className="flex items-center gap-2 mb-2">
              {leadArticle.isLive && (
                <div className="flex items-center gap-1.5 text-xs font-bold text-[#CC0000] uppercase tracking-wider">
                  <Radio className="w-3.5 h-3.5 text-[#CC0000] animate-pulse" />
                  <span>Live Updates</span>
                </div>
              )}
              {leadArticle.isLive && <span className="text-neutral-300">·</span>}
              <span className="text-xs font-semibold text-neutral-500 uppercase tracking-wider">
                {leadArticle.category}
              </span>
            </div>

            <h1 
              onClick={() => onReadArticle(leadArticle)}
              className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-black text-neutral-900 font-headline leading-[1.08] hover:text-[#CC0000] transition-colors cursor-pointer text-balance"
            >
              {leadArticle.title}
            </h1>

            <p className="mt-3 text-base sm:text-lg text-neutral-700 leading-snug">
              {leadArticle.deck}
            </p>
          </div>

          {/* Lead Photo with Caption */}
          <div 
            onClick={() => onReadArticle(leadArticle)}
            className="group relative overflow-hidden rounded-md cursor-pointer bg-neutral-900 shadow-sm"
          >
            <img
              src={leadArticle.imageUrl}
              alt={leadArticle.title}
              referrerPolicy="no-referrer"
              className="w-full h-auto aspect-[16/9] object-cover transition-transform duration-500 group-hover:scale-[1.02]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80" />
            
            {/* Quick Read badge overlay */}
            <div className="absolute bottom-3 right-3 bg-black/75 backdrop-blur-xs text-white text-xs px-2.5 py-1 rounded font-medium flex items-center gap-1.5">
              <span>Read Full Report</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </div>

          <p className="text-xs text-neutral-500 italic mt-2">
            {leadArticle.imageCaption}
          </p>

          {/* Byline, Published time, and Bookmark button */}
          <div className="mt-4 pt-3 border-t border-neutral-200 flex flex-wrap items-center justify-between gap-3 text-xs text-neutral-600">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-neutral-900">By {leadArticle.author}</span>
              <span>·</span>
              <span>{leadArticle.authorRole}</span>
              <span>·</span>
              <span className="flex items-center gap-1 text-neutral-500 font-medium">
                <Clock className="w-3.5 h-3.5" /> {leadArticle.publishedAt}
              </span>
            </div>

            <button
              onClick={(e) => {
                e.stopPropagation();
                onToggleBookmark(leadArticle);
              }}
              className={`flex items-center gap-1 px-2.5 py-1 rounded border text-xs font-medium transition-colors cursor-pointer ${
                isBookmarked(leadArticle.id)
                  ? 'bg-red-50 text-[#CC0000] border-red-200'
                  : 'bg-white text-neutral-700 border-neutral-300 hover:bg-neutral-100'
              }`}
              title="Bookmark story"
            >
              <Bookmark className={`w-3.5 h-3.5 ${isBookmarked(leadArticle.id) ? 'fill-current' : ''}`} />
              <span>{isBookmarked(leadArticle.id) ? 'Saved' : 'Save'}</span>
            </button>
          </div>

          {/* Key Takeaways Box (Classic CNN "The Big Picture") */}
          <div className="mt-5 p-4 bg-neutral-50 border border-neutral-200 rounded-md">
            <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-800 mb-2">
              Key Developments
            </h3>
            <ul className="space-y-2">
              {leadArticle.keyTakeaways.map((point, index) => (
                <li key={index} className="flex items-start gap-2 text-sm text-neutral-800">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#CC0000] mt-2 shrink-0" />
                  <span className="leading-snug">{point}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Flanking Secondary Features (Takes 4 columns on desktop) */}
        <div className="lg:col-span-4 flex flex-col gap-6 lg:border-l lg:border-neutral-200 lg:pl-6">
          <div className="border-b-2 border-neutral-900 pb-1.5">
            <h2 className="text-sm font-bold uppercase tracking-wider text-neutral-900 font-headline">
              Top Stories
            </h2>
          </div>

          <div className="space-y-6 divide-y divide-neutral-200">
            {secondaryArticles.map((article, idx) => {
              const bookmarked = isBookmarked(article.id);
              return (
                <article key={article.id} className={idx > 0 ? 'pt-6' : ''}>
                  {/* Category & Time */}
                  <div className="flex items-center justify-between text-xs text-neutral-500 mb-1.5">
                    <span className="font-bold text-[#CC0000] uppercase tracking-wide">
                      {article.category}
                    </span>
                    <span className="font-mono">{article.publishedAt}</span>
                  </div>

                  {/* Thumbnail if present */}
                  <div 
                    onClick={() => onReadArticle(article)}
                    className="group cursor-pointer mb-2.5 overflow-hidden rounded bg-neutral-100"
                  >
                    <img
                      src={article.imageUrl}
                      alt={article.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>

                  {/* Headline */}
                  <h3
                    onClick={() => onReadArticle(article)}
                    className="text-base sm:text-lg font-bold text-neutral-900 font-headline leading-snug hover:text-[#CC0000] transition-colors cursor-pointer"
                  >
                    {article.title}
                  </h3>

                  <p className="mt-1.5 text-xs text-neutral-600 line-clamp-2">
                    {article.deck}
                  </p>

                  {/* Footer metadata */}
                  <div className="mt-3 flex items-center justify-between text-xs text-neutral-500 pt-2 border-t border-neutral-100">
                    <span className="truncate">By {article.author}</span>
                    <button
                      onClick={() => onToggleBookmark(article)}
                      className="p-1 hover:text-black cursor-pointer"
                      title="Bookmark"
                    >
                      <Bookmark className={`w-3.5 h-3.5 ${bookmarked ? 'fill-[#CC0000] text-[#CC0000]' : ''}`} />
                    </button>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
