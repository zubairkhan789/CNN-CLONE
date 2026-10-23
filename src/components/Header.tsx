import React, { useState } from 'react';
import { 
  Search, 
  Bookmark, 
  Menu, 
  X, 
  Tv, 
  Headphones, 
  CloudSun, 
  Sun, 
  CloudRain, 
  Cloud,
  ChevronDown,
  Globe2,
  TrendingUp,
  TrendingDown
} from 'lucide-react';
import { CITIES_WEATHER, MARKET_INDICES, CategoryType } from '../data/newsData';

interface HeaderProps {
  activeCategory: CategoryType;
  onSelectCategory: (category: CategoryType) => void;
  savedCount: number;
  onOpenSaved: () => void;
  onOpenSearch: () => void;
  onOpenLiveTv: () => void;
  onHomeClick: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeCategory,
  onSelectCategory,
  savedCount,
  onOpenSaved,
  onOpenSearch,
  onOpenLiveTv,
  onHomeClick
}) => {
  const [selectedCityIndex, setSelectedCityIndex] = useState(0);
  const [selectedEdition, setSelectedEdition] = useState<'US' | 'International' | 'Español' | 'Arabic'>('US');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showEditionDropdown, setShowEditionDropdown] = useState(false);

  const currentWeather = CITIES_WEATHER[selectedCityIndex];

  const getWeatherIcon = (iconName: string) => {
    switch (iconName) {
      case 'cloud-sun':
        return <CloudSun className="w-3.5 h-3.5 text-amber-500" />;
      case 'sun':
        return <Sun className="w-3.5 h-3.5 text-amber-500" />;
      case 'cloud-rain':
        return <CloudRain className="w-3.5 h-3.5 text-blue-400" />;
      case 'cloud':
        return <Cloud className="w-3.5 h-3.5 text-slate-400" />;
      default:
        return <CloudSun className="w-3.5 h-3.5 text-amber-500" />;
    }
  };

  const navCategories: CategoryType[] = [
    'All',
    'World',
    'US Politics',
    'Business',
    'Tech',
    'Climate',
    'Entertainment',
    'Sports',
    'Opinion'
  ];

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-neutral-200 shadow-[0_1px_3px_rgba(0,0,0,0.05)]">
      {/* Utility Top Bar */}
      <div className="bg-[#111111] text-neutral-300 text-xs py-1.5 px-4 lg:px-8 border-b border-neutral-800">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          {/* Left: Weather and Edition selector */}
          <div className="flex items-center gap-4 sm:gap-6">
            {/* Weather widget */}
            <div className="relative group">
              <button 
                onClick={() => setSelectedCityIndex((prev) => (prev + 1) % CITIES_WEATHER.length)}
                className="flex items-center gap-1.5 hover:text-white transition-colors cursor-pointer py-0.5"
                title="Click to cycle cities"
              >
                {getWeatherIcon(currentWeather.icon)}
                <span className="font-medium text-white">{currentWeather.city}</span>
                <span className="text-neutral-400 font-mono">{currentWeather.temp}</span>
                <span className="hidden md:inline text-neutral-400">· {currentWeather.condition}</span>
              </button>
            </div>

            {/* Live Markets mini ticker */}
            <div className="hidden lg:flex items-center gap-4 border-l border-neutral-800 pl-4 font-mono text-[11px]">
              {MARKET_INDICES.slice(0, 3).map((market) => (
                <div key={market.symbol} className="flex items-center gap-1.5">
                  <span className="text-neutral-400">{market.symbol}</span>
                  <span className="text-white font-medium">{market.value}</span>
                  <span className={`flex items-center text-[10px] ${market.isPositive ? 'text-emerald-400' : 'text-red-400'}`}>
                    {market.isPositive ? <TrendingUp className="w-3 h-3 mr-0.5" /> : <TrendingDown className="w-3 h-3 mr-0.5" />}
                    {market.percent}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Edition, Audio, Live TV, Bookmarks */}
          <div className="flex items-center gap-3 sm:gap-5">
            {/* Edition Dropdown */}
            <div className="relative">
              <button
                onClick={() => setShowEditionDropdown(!showEditionDropdown)}
                className="flex items-center gap-1 text-neutral-300 hover:text-white transition-colors py-0.5 cursor-pointer font-medium"
              >
                <Globe2 className="w-3.5 h-3.5 text-neutral-400" />
                <span>Edition: {selectedEdition}</span>
                <ChevronDown className="w-3 h-3 text-neutral-400" />
              </button>

              {showEditionDropdown && (
                <div className="absolute right-0 top-full mt-1 w-36 bg-neutral-900 border border-neutral-800 rounded shadow-xl py-1 z-50">
                  {(['US', 'International', 'Español', 'Arabic'] as const).map((ed) => (
                    <button
                      key={ed}
                      onClick={() => {
                        setSelectedEdition(ed);
                        setShowEditionDropdown(false);
                      }}
                      className={`w-full text-left px-3 py-1.5 text-xs transition-colors hover:bg-neutral-800 cursor-pointer ${
                        selectedEdition === ed ? 'text-white font-semibold' : 'text-neutral-400'
                      }`}
                    >
                      {ed} Edition
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Audio feature button */}
            <button
              onClick={() => {
                const el = document.getElementById('featured-audio');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
                else onOpenSearch();
              }}
              className="hidden sm:flex items-center gap-1 hover:text-white transition-colors cursor-pointer"
            >
              <Headphones className="w-3.5 h-3.5 text-neutral-400" />
              <span>Audio</span>
            </button>

            {/* Live TV broadcast simulation button */}
            <button
              onClick={onOpenLiveTv}
              className="flex items-center gap-1.5 bg-[#CC0000] hover:bg-[#B30000] text-white px-2.5 py-0.5 rounded font-semibold text-[11px] transition-colors cursor-pointer"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
              <Tv className="w-3 h-3" />
              <span>Live TV</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main CNN Brand & Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 lg:px-8 py-2.5 flex items-center justify-between gap-4">
        {/* Left: CNN Iconic Wordmark Logo */}
        <div className="flex items-center gap-6">
          <button
            onClick={onHomeClick}
            className="flex items-center gap-1 cursor-pointer group focus:outline-none"
            aria-label="CNN Home"
          >
            {/* Authentic CNN Logo Vector Badge */}
            <div className="bg-[#CC0000] group-hover:bg-[#B30000] transition-colors px-3 py-1.5 rounded-sm flex items-center justify-center shadow-sm">
              <span className="text-white font-black text-2xl tracking-tighter font-headline select-none">
                CNN
              </span>
            </div>
            <span className="hidden xl:inline-block text-[11px] font-bold text-neutral-500 uppercase tracking-widest pl-2 border-l border-neutral-300">
              World News Hub
            </span>
          </button>

          {/* Desktop Nav Categories */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2">
            {navCategories.map((cat) => {
              const isActive = activeCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => {
                    onSelectCategory(cat);
                    if (window.scrollY > 200) {
                      window.scrollTo({ top: 120, behavior: 'smooth' });
                    }
                  }}
                  className={`px-2.5 py-1 text-sm font-semibold tracking-tight transition-colors whitespace-nowrap cursor-pointer rounded ${
                    isActive
                      ? 'text-[#CC0000] bg-red-50/70 border-b-2 border-[#CC0000]'
                      : 'text-neutral-700 hover:text-black hover:bg-neutral-100'
                  }`}
                >
                  {cat === 'All' ? 'Home' : cat}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Right Actions: Search, Saved Articles, Mobile Menu */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Search Trigger Button */}
          <button
            onClick={onOpenSearch}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-neutral-600 hover:text-black bg-neutral-100 hover:bg-neutral-200 rounded-md transition-colors cursor-pointer border border-neutral-200"
            aria-label="Search articles"
          >
            <Search className="w-3.5 h-3.5 text-neutral-500" />
            <span className="hidden sm:inline">Search</span>
          </button>

          {/* Saved Articles Trigger */}
          <button
            onClick={onOpenSaved}
            className="relative flex items-center gap-1 px-3 py-1.5 text-xs font-medium text-neutral-700 hover:text-black bg-neutral-100 hover:bg-neutral-200 rounded-md transition-colors cursor-pointer border border-neutral-200"
            aria-label="Saved Articles"
          >
            <Bookmark className="w-3.5 h-3.5 text-neutral-600" />
            <span className="hidden sm:inline">Saved</span>
            {savedCount > 0 && (
              <span className="bg-[#CC0000] text-white text-[10px] font-bold px-1.5 py-0.2 rounded-full min-w-4 text-center">
                {savedCount}
              </span>
            )}
          </button>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-1.5 text-neutral-700 hover:text-black hover:bg-neutral-100 rounded cursor-pointer"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-neutral-50 border-t border-neutral-200 px-4 py-3 shadow-inner">
          <div className="grid grid-cols-2 gap-2">
            {navCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  onSelectCategory(cat);
                  setIsMobileMenuOpen(false);
                }}
                className={`text-left px-3 py-2 rounded text-sm font-semibold transition-colors cursor-pointer ${
                  activeCategory === cat
                    ? 'bg-[#CC0000] text-white'
                    : 'text-neutral-800 hover:bg-neutral-200'
                }`}
              >
                {cat === 'All' ? 'Home' : cat}
              </button>
            ))}
          </div>
          <div className="mt-3 pt-3 border-t border-neutral-200 flex items-center justify-between text-xs text-neutral-500">
            <span>Live CNN Stream active</span>
            <button
              onClick={() => {
                onOpenLiveTv();
                setIsMobileMenuOpen(false);
              }}
              className="text-[#CC0000] font-bold flex items-center gap-1 cursor-pointer"
            >
              <Tv className="w-3.5 h-3.5" /> Watch Live
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
