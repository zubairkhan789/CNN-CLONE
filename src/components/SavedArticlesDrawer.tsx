import React from 'react';
import { X, Trash2, ArrowRight, Bookmark } from 'lucide-react';
import { Article } from '../data/newsData';

interface SavedArticlesDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  savedArticles: Article[];
  onRemove: (id: string) => void;
  onClearAll: () => void;
  onReadArticle: (article: Article) => void;
}

export const SavedArticlesDrawer: React.FC<SavedArticlesDrawerProps> = ({
  isOpen,
  onClose,
  savedArticles,
  onRemove,
  onClearAll,
  onReadArticle,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div 
        onClick={onClose}
        className="absolute inset-0 bg-black/50 backdrop-blur-xs transition-opacity" 
      />

      <div className="fixed inset-y-0 right-0 max-w-md w-full bg-white shadow-2xl flex flex-col z-10 border-l border-neutral-200">
        {/* Header */}
        <div className="p-5 border-b border-neutral-200 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-1.5 bg-red-100 text-[#CC0000] rounded">
              <Bookmark className="w-4 h-4 fill-current" />
            </div>
            <div>
              <h2 className="text-base font-bold font-headline text-neutral-900">
                Saved Reading List
              </h2>
              <span className="text-xs text-neutral-500">
                {savedArticles.length} {savedArticles.length === 1 ? 'story' : 'stories'} saved
              </span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-neutral-500 hover:text-black hover:bg-neutral-100 rounded-md transition-colors cursor-pointer"
            aria-label="Close saved drawer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content list */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {savedArticles.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center text-neutral-400 p-6">
              <Bookmark className="w-12 h-12 stroke-1 mb-3 text-neutral-300" />
              <p className="text-sm font-semibold text-neutral-700">No saved stories yet</p>
              <p className="text-xs text-neutral-500 mt-1 max-w-xs">
                Click the bookmark icon on any headline or report to save it for reading later.
              </p>
            </div>
          ) : (
            savedArticles.map((article) => (
              <div
                key={article.id}
                className="p-3.5 border border-neutral-200 rounded-lg hover:border-neutral-300 transition-colors bg-white flex gap-3 group"
              >
                <div 
                  onClick={() => {
                    onReadArticle(article);
                    onClose();
                  }}
                  className="w-20 h-20 rounded overflow-hidden shrink-0 bg-neutral-100 cursor-pointer"
                >
                  <img
                    src={article.imageUrl}
                    alt={article.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                  />
                </div>

                <div className="flex-1 min-w-0 flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] font-bold text-[#CC0000] uppercase tracking-wider block">
                      {article.category}
                    </span>
                    <h3 
                      onClick={() => {
                        onReadArticle(article);
                        onClose();
                      }}
                      className="text-xs font-bold text-neutral-900 line-clamp-2 leading-snug cursor-pointer hover:text-[#CC0000]"
                    >
                      {article.title}
                    </h3>
                  </div>

                  <div className="flex items-center justify-between text-[11px] text-neutral-500 pt-1">
                    <span>{article.readTime}</span>
                    <button
                      onClick={() => onRemove(article.id)}
                      className="text-neutral-400 hover:text-red-600 transition-colors p-1 cursor-pointer"
                      title="Remove from saved"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer actions */}
        {savedArticles.length > 0 && (
          <div className="p-4 border-t border-neutral-200 bg-neutral-50 flex items-center justify-between">
            <button
              onClick={onClearAll}
              className="text-xs text-neutral-500 hover:text-red-600 font-medium transition-colors cursor-pointer"
            >
              Clear all saved
            </button>
            <span className="text-xs text-neutral-400">Synced to local session</span>
          </div>
        )}
      </div>
    </div>
  );
};
