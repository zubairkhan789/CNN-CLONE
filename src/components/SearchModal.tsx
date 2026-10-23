import React, { useState, useMemo } from 'react';
import { Search, X, ArrowRight, Clock } from 'lucide-react';
import { Article, CategoryType, CATEGORIES } from '../data/newsData';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  articles: Article[];
  onReadArticle: (article: Article) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  articles,
  onReadArticle,
}) => {
  const [query, setQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState<CategoryType>('All');

  const filteredArticles = useMemo(() => {
    return articles.filter((article) => {
      const matchesCategory =
        selectedFilter === 'All' || article.category === selectedFilter;
      const q = query.toLowerCase().trim();
      if (!q) return matchesCategory;

      const matchesText =
        article.title.toLowerCase().includes(q) ||
        article.deck.toLowerCase().includes(q) ||
        article.author.toLowerCase().includes(q) ||
        article.category.toLowerCase().includes(q);

      return matchesCategory && matchesText;
    });
  }, [articles, query, selectedFilter]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div 
        onClick={onClose}
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity" 
      />

      <div className="relative min-h-screen flex items-start justify-center p-4 sm:p-6 lg:p-8">
        <div className="relative w-full max-w-2xl bg-white rounded-lg shadow-2xl border border-neutral-200 overflow-hidden mt-12 sm:mt-16">
          {/* Search Input Bar */}
          <div className="p-4 sm:p-5 border-b border-neutral-200 flex items-center gap-3">
            <Search className="w-5 h-5 text-neutral-400 shrink-0" />
            <input
              type="text"
              autoFocus
              placeholder="Search breaking news, topics, reporters..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full text-base sm:text-lg font-medium text-neutral-900 placeholder:text-neutral-400 focus:outline-none"
            />
            {query && (
              <button
                onClick={() => setQuery('')}
                className="p-1 text-neutral-400 hover:text-black cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            )}
            <button
              onClick={onClose}
              className="p-1.5 text-neutral-500 hover:text-black hover:bg-neutral-100 rounded cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Category filter pills */}
          <div className="px-4 py-2.5 bg-neutral-50 border-b border-neutral-200 flex items-center gap-1.5 overflow-x-auto no-scrollbar">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedFilter(cat)}
                className={`px-2.5 py-1 rounded text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                  selectedFilter === cat
                    ? 'bg-[#CC0000] text-white shadow-xs'
                    : 'text-neutral-600 hover:text-black hover:bg-neutral-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Results count & list */}
          <div className="p-4 sm:p-5 max-h-[60vh] overflow-y-auto space-y-4">
            <div className="text-xs font-medium text-neutral-500 flex items-center justify-between">
              <span>{filteredArticles.length} results found</span>
              {query && <span>Searching for "{query}"</span>}
            </div>

            {filteredArticles.length === 0 ? (
              <div className="py-12 text-center text-neutral-500">
                <p className="text-sm font-semibold">No matching news reports</p>
                <p className="text-xs mt-1 text-neutral-400">Try a different keyword or select "All" categories.</p>
              </div>
            ) : (
              filteredArticles.map((article) => (
                <div
                  key={article.id}
                  onClick={() => {
                    onReadArticle(article);
                    onClose();
                  }}
                  className="p-3 border border-neutral-200 hover:border-neutral-300 rounded-md hover:bg-neutral-50/80 transition-all cursor-pointer flex gap-3 group"
                >
                  <div className="w-24 h-18 rounded overflow-hidden shrink-0 bg-neutral-100">
                    <img
                      src={article.imageUrl}
                      alt={article.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 text-[10px] text-neutral-500 mb-1">
                      <span className="font-bold text-[#CC0000] uppercase tracking-wider">
                        {article.category}
                      </span>
                      <span>·</span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" /> {article.publishedAt}
                      </span>
                    </div>

                    <h4 className="text-sm font-bold text-neutral-900 group-hover:text-[#CC0000] transition-colors leading-snug line-clamp-2">
                      {article.title}
                    </h4>

                    <p className="text-xs text-neutral-600 mt-1 line-clamp-1">
                      {article.deck}
                    </p>
                  </div>

                  <div className="self-center hidden sm:block text-neutral-400 group-hover:text-black group-hover:translate-x-0.5 transition-transform">
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
