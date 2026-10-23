import React from 'react';
import { Bookmark, Clock, Play, ArrowRight } from 'lucide-react';
import { Article, CategoryType } from '../data/newsData';

interface NewsGridProps {
  articles: Article[];
  selectedCategory: CategoryType;
  onReadArticle: (article: Article) => void;
  isBookmarked: (id: string) => boolean;
  onToggleBookmark: (article: Article) => void;
  onSelectCategory: (category: CategoryType) => void;
}

export const NewsGrid: React.FC<NewsGridProps> = ({
  articles,
  selectedCategory,
  onReadArticle,
  isBookmarked,
  onToggleBookmark,
  onSelectCategory,
}) => {
  // If specific category selected (not 'All'), show filtered view
  const isFiltered = selectedCategory !== 'All';
  const displayArticles = isFiltered
    ? articles.filter((a) => a.category === selectedCategory)
    : articles;

  if (isFiltered) {
    return (
      <section className="mb-12">
        <div className="flex items-center justify-between border-b-2 border-[#CC0000] pb-2 mb-6">
          <h2 className="text-2xl font-black text-neutral-900 font-headline uppercase tracking-tight">
            {selectedCategory} News
          </h2>
          <button
            onClick={() => onSelectCategory('All')}
            className="text-xs font-semibold text-[#CC0000] hover:underline cursor-pointer"
          >
            ← View All Sections
          </button>
        </div>

        {displayArticles.length === 0 ? (
          <div className="py-12 text-center text-neutral-500 bg-neutral-50 rounded border border-neutral-200">
            <p className="text-base font-medium">No stories currently in this section.</p>
            <button
              onClick={() => onSelectCategory('All')}
              className="mt-3 px-4 py-1.5 text-xs bg-neutral-900 text-white rounded font-medium hover:bg-black transition-colors cursor-pointer"
            >
              Return to Top Stories
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayArticles.map((article) => {
              const bookmarked = isBookmarked(article.id);
              return (
                <article
                  key={article.id}
                  className="bg-white border border-neutral-200 rounded-md overflow-hidden hover:shadow-md transition-shadow flex flex-col justify-between"
                >
                  <div>
                    <div 
                      onClick={() => onReadArticle(article)}
                      className="relative overflow-hidden cursor-pointer group bg-neutral-100"
                    >
                      <img
                        src={article.imageUrl}
                        alt={article.title}
                        referrerPolicy="no-referrer"
                        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      {article.videoDuration && (
                        <div className="absolute bottom-2 left-2 bg-black/80 text-white text-[10px] font-bold px-2 py-0.5 rounded flex items-center gap-1 backdrop-blur-xs">
                          <Play className="w-2.5 h-2.5 fill-white" />
                          <span>{article.videoDuration}</span>
                        </div>
                      )}
                    </div>

                    <div className="p-4">
                      <div className="flex items-center justify-between text-xs text-neutral-500 mb-1.5">
                        <span className="font-bold text-[#CC0000] uppercase tracking-wide">
                          {article.category}
                        </span>
                        <span className="font-mono">{article.publishedAt}</span>
                      </div>

                      <h3
                        onClick={() => onReadArticle(article)}
                        className="text-lg font-bold text-neutral-900 font-headline leading-snug hover:text-[#CC0000] transition-colors cursor-pointer"
                      >
                        {article.title}
                      </h3>

                      <p className="mt-2 text-xs text-neutral-600 line-clamp-3 leading-relaxed">
                        {article.deck}
                      </p>
                    </div>
                  </div>

                  <div className="px-4 py-3 bg-neutral-50 border-t border-neutral-100 flex items-center justify-between text-xs text-neutral-600">
                    <span className="truncate">By {article.author}</span>
                    <button
                      onClick={() => onToggleBookmark(article)}
                      className="p-1 text-neutral-500 hover:text-black cursor-pointer"
                      title="Bookmark story"
                    >
                      <Bookmark className={`w-3.5 h-3.5 ${bookmarked ? 'fill-[#CC0000] text-[#CC0000]' : ''}`} />
                    </button>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </section>
    );
  }

  // Multi-section Grid for homepage
  const businessArticles = articles.filter(a => a.category === 'Business');
  const techArticles = articles.filter(a => a.category === 'Tech');
  const climateArticles = articles.filter(a => a.category === 'Climate');
  const politicsArticles = articles.filter(a => a.category === 'US Politics');

  return (
    <section className="mb-12 space-y-12">
      {/* Business & Tech Section */}
      <div>
        <div className="flex items-center justify-between border-b-2 border-neutral-900 pb-2 mb-6">
          <h2 className="text-xl font-black text-neutral-900 font-headline uppercase tracking-tight flex items-center gap-2">
            <span className="w-2 h-2 bg-[#CC0000]" />
            Business & Innovation
          </h2>
          <button
            onClick={() => onSelectCategory('Business')}
            className="flex items-center gap-1 text-xs font-semibold text-[#CC0000] hover:underline cursor-pointer"
          >
            <span>More in Business</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...businessArticles, ...techArticles].slice(0, 3).map((article) => {
            const bookmarked = isBookmarked(article.id);
            return (
              <article 
                key={article.id}
                className="bg-white border border-neutral-200 rounded-md overflow-hidden hover:shadow-md transition-shadow flex flex-col justify-between"
              >
                <div>
                  <div 
                    onClick={() => onReadArticle(article)}
                    className="relative overflow-hidden cursor-pointer group bg-neutral-100"
                  >
                    <img
                      src={article.imageUrl}
                      alt={article.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-44 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    {article.videoDuration && (
                      <div className="absolute bottom-2 left-2 bg-black/80 text-white text-[10px] font-bold px-2 py-0.5 rounded flex items-center gap-1 backdrop-blur-xs">
                        <Play className="w-2.5 h-2.5 fill-white" />
                        <span>{article.videoDuration}</span>
                      </div>
                    )}
                  </div>

                  <div className="p-4">
                    <div className="flex items-center justify-between text-xs text-neutral-500 mb-1.5">
                      <span className="font-bold text-[#CC0000] uppercase tracking-wide">
                        {article.category}
                      </span>
                      <span className="font-mono text-[11px]">{article.publishedAt}</span>
                    </div>

                    <h3
                      onClick={() => onReadArticle(article)}
                      className="text-base font-bold text-neutral-900 font-headline leading-snug hover:text-[#CC0000] transition-colors cursor-pointer"
                    >
                      {article.title}
                    </h3>

                    <p className="mt-2 text-xs text-neutral-600 line-clamp-2 leading-relaxed">
                      {article.deck}
                    </p>
                  </div>
                </div>

                <div className="px-4 py-2.5 bg-neutral-50 border-t border-neutral-100 flex items-center justify-between text-xs text-neutral-600">
                  <span className="truncate">By {article.author}</span>
                  <button
                    onClick={() => onToggleBookmark(article)}
                    className="p-1 text-neutral-500 hover:text-black cursor-pointer"
                    title="Bookmark story"
                  >
                    <Bookmark className={`w-3.5 h-3.5 ${bookmarked ? 'fill-[#CC0000] text-[#CC0000]' : ''}`} />
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      </div>

      {/* Climate & Politics Section */}
      <div>
        <div className="flex items-center justify-between border-b-2 border-neutral-900 pb-2 mb-6">
          <h2 className="text-xl font-black text-neutral-900 font-headline uppercase tracking-tight flex items-center gap-2">
            <span className="w-2 h-2 bg-[#CC0000]" />
            Climate, Science & Policy
          </h2>
          <button
            onClick={() => onSelectCategory('Climate')}
            className="flex items-center gap-1 text-xs font-semibold text-[#CC0000] hover:underline cursor-pointer"
          >
            <span>More in Climate</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[...climateArticles, ...politicsArticles].slice(0, 2).map((article) => {
            const bookmarked = isBookmarked(article.id);
            return (
              <article 
                key={article.id}
                className="bg-white border border-neutral-200 rounded-md p-4 sm:p-5 flex flex-col sm:flex-row gap-4 items-start hover:shadow-md transition-shadow"
              >
                <div 
                  onClick={() => onReadArticle(article)}
                  className="w-full sm:w-44 h-36 shrink-0 overflow-hidden rounded bg-neutral-100 cursor-pointer group"
                >
                  <img
                    src={article.imageUrl}
                    alt={article.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>

                <div className="flex flex-col justify-between flex-1 h-full">
                  <div>
                    <div className="flex items-center justify-between text-xs text-neutral-500 mb-1">
                      <span className="font-bold text-[#CC0000] uppercase tracking-wide">
                        {article.category}
                      </span>
                      <span className="font-mono text-[11px]">{article.publishedAt}</span>
                    </div>

                    <h3
                      onClick={() => onReadArticle(article)}
                      className="text-base font-bold text-neutral-900 font-headline leading-snug hover:text-[#CC0000] transition-colors cursor-pointer"
                    >
                      {article.title}
                    </h3>

                    <p className="mt-1.5 text-xs text-neutral-600 line-clamp-2">
                      {article.deck}
                    </p>
                  </div>

                  <div className="mt-3 pt-2 border-t border-neutral-100 flex items-center justify-between text-xs text-neutral-500">
                    <span className="truncate">{article.readTime}</span>
                    <button
                      onClick={() => onToggleBookmark(article)}
                      className="p-1 hover:text-black cursor-pointer"
                      title="Bookmark"
                    >
                      <Bookmark className={`w-3.5 h-3.5 ${bookmarked ? 'fill-[#CC0000] text-[#CC0000]' : ''}`} />
                    </button>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};
