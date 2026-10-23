import React, { useState, useEffect } from 'react';
import { INITIAL_ARTICLES, Article, CategoryType } from './data/newsData';
import { Header } from './components/Header';
import { BreakingBanner } from './components/BreakingBanner';
import { LeadHero } from './components/LeadHero';
import { LiveUpdatesFeed } from './components/LiveUpdatesFeed';
import { NewsGrid } from './components/NewsGrid';
import { OpinionSection } from './components/OpinionSection';
import { VideoSection } from './components/VideoSection';
import { ReaderPoll } from './components/ReaderPoll';
import { ArticleView } from './components/ArticleView';
import { SavedArticlesDrawer } from './components/SavedArticlesDrawer';
import { SearchModal } from './components/SearchModal';
import { LiveTvModal } from './components/LiveTvModal';
import { Footer } from './components/Footer';

export default function App() {
  const [articles, setArticles] = useState<Article[]>(INITIAL_ARTICLES);
  const [activeCategory, setActiveCategory] = useState<CategoryType>('All');
  const [activeArticle, setActiveArticle] = useState<Article | null>(null);
  
  // Bookmarking state
  const [savedArticleIds, setSavedArticleIds] = useState<string[]>(() => {
    try {
      const stored = localStorage.getItem('cnn_saved_articles');
      return stored ? JSON.parse(stored) : ['diplomatic-summit-geneva-accord'];
    } catch {
      return ['diplomatic-summit-geneva-accord'];
    }
  });

  // Modal drawers
  const [isSavedDrawerOpen, setIsSavedDrawerOpen] = useState(false);
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const [isLiveTvModalOpen, setIsLiveTvModalOpen] = useState(false);

  // Toast feedback
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Sync saved bookmarks with localStorage
  useEffect(() => {
    try {
      localStorage.setItem('cnn_saved_articles', JSON.stringify(savedArticleIds));
    } catch (e) {
      console.error(e);
    }
  }, [savedArticleIds]);

  // URL Hash handling for direct article linking
  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash;
      if (hash.startsWith('#article/')) {
        const id = hash.replace('#article/', '');
        const found = articles.find(a => a.id === id);
        if (found) {
          setActiveArticle(found);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      } else if (!hash) {
        setActiveArticle(null);
      }
    };

    handleHash();
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, [articles]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  const handleToggleBookmark = (article: Article) => {
    setSavedArticleIds(prev => {
      if (prev.includes(article.id)) {
        showToast(`Removed "${article.title.slice(0, 35)}..." from Saved`);
        return prev.filter(id => id !== article.id);
      } else {
        showToast(`Saved "${article.title.slice(0, 35)}..." to Reading List`);
        return [...prev, article.id];
      }
    });
  };

  const isBookmarked = (id: string) => savedArticleIds.includes(id);

  const handleReadArticle = (article: Article) => {
    setActiveArticle(article);
    window.location.hash = `#article/${article.id}`;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToHome = () => {
    setActiveArticle(null);
    window.location.hash = '';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const breakingArticle = articles.find(a => a.isBreaking) || articles[0];
  const leadArticle = articles[0];
  const secondaryArticles = articles.slice(1, 4);
  const savedArticles = articles.filter(a => savedArticleIds.includes(a.id));

  return (
    <div className="min-h-screen bg-[#fcfcfc] text-neutral-900 flex flex-col font-sans selection:bg-red-100 selection:text-red-900">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-neutral-900 text-white text-xs font-semibold px-4 py-2.5 rounded-md shadow-xl border border-neutral-700 flex items-center gap-2 animate-bounce">
          <span className="w-2 h-2 rounded-full bg-[#CC0000]" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Main CNN Header */}
      <Header
        activeCategory={activeCategory}
        onSelectCategory={(cat) => {
          setActiveCategory(cat);
          if (activeArticle) handleBackToHome();
        }}
        savedCount={savedArticleIds.length}
        onOpenSaved={() => setIsSavedDrawerOpen(true)}
        onOpenSearch={() => setIsSearchModalOpen(true)}
        onOpenLiveTv={() => setIsLiveTvModalOpen(true)}
        onHomeClick={handleBackToHome}
      />

      {/* Breaking News Ticker (Homepage only) */}
      {!activeArticle && (
        <BreakingBanner
          article={breakingArticle}
          onReadArticle={handleReadArticle}
        />
      )}

      {/* Main Content Area */}
      <main className="flex-1">
        {activeArticle ? (
          <ArticleView
            article={activeArticle}
            onBack={handleBackToHome}
            isBookmarked={isBookmarked(activeArticle.id)}
            onToggleBookmark={() => handleToggleBookmark(activeArticle)}
            onSelectArticle={handleReadArticle}
            allArticles={articles}
          />
        ) : (
          <div className="max-w-7xl mx-auto px-4 lg:px-8 py-6 sm:py-8">
            {/* Lead 3-Column / 2-Column Hero */}
            {activeCategory === 'All' && (
              <LeadHero
                leadArticle={leadArticle}
                secondaryArticles={secondaryArticles}
                onReadArticle={handleReadArticle}
                isBookmarked={isBookmarked}
                onToggleBookmark={handleToggleBookmark}
              />
            )}

            {/* Mid-Page Grid: Live Updates on right, categories on left */}
            {activeCategory === 'All' && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-10 items-start">
                <div className="lg:col-span-8">
                  <VideoSection
                    articles={articles}
                    onReadArticle={handleReadArticle}
                  />
                </div>
                <div className="lg:col-span-4 space-y-6">
                  <LiveUpdatesFeed />
                  <ReaderPoll />
                </div>
              </div>
            )}

            {/* Multi-category News Grid */}
            <NewsGrid
              articles={articles}
              selectedCategory={activeCategory}
              onReadArticle={handleReadArticle}
              isBookmarked={isBookmarked}
              onToggleBookmark={handleToggleBookmark}
              onSelectCategory={setActiveCategory}
            />

            {/* CNN Opinion Section */}
            {activeCategory === 'All' && (
              <OpinionSection
                articles={articles}
                onReadArticle={handleReadArticle}
                isBookmarked={isBookmarked}
                onToggleBookmark={handleToggleBookmark}
              />
            )}
          </div>
        )}
      </main>

      {/* Saved Articles Drawer */}
      <SavedArticlesDrawer
        isOpen={isSavedDrawerOpen}
        onClose={() => setIsSavedDrawerOpen(false)}
        savedArticles={savedArticles}
        onRemove={(id) => {
          setSavedArticleIds(prev => prev.filter(item => item !== id));
          showToast('Removed story from reading list');
        }}
        onClearAll={() => {
          setSavedArticleIds([]);
          showToast('Cleared all saved stories');
        }}
        onReadArticle={handleReadArticle}
      />

      {/* Search Modal */}
      <SearchModal
        isOpen={isSearchModalOpen}
        onClose={() => setIsSearchModalOpen(false)}
        articles={articles}
        onReadArticle={handleReadArticle}
      />

      {/* Live TV Broadcast Modal */}
      <LiveTvModal
        isOpen={isLiveTvModalOpen}
        onClose={() => setIsLiveTvModalOpen(false)}
      />

      {/* Footer */}
      <Footer onSelectCategory={(cat) => {
        setActiveCategory(cat);
        if (activeArticle) handleBackToHome();
        window.scrollTo({ top: 120, behavior: 'smooth' });
      }} />
    </div>
  );
}
