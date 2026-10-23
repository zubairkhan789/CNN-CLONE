import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft, 
  Bookmark, 
  Share2, 
  Headphones, 
  Play, 
  Pause, 
  Volume2, 
  RotateCcw, 
  ThumbsUp, 
  MessageSquare, 
  Send, 
  Copy, 
  Check, 
  Clock, 
  Radio, 
  Type
} from 'lucide-react';
import { Article, Comment } from '../data/newsData';

interface ArticleViewProps {
  article: Article;
  onBack: () => void;
  isBookmarked: boolean;
  onToggleBookmark: () => void;
  onSelectArticle: (article: Article) => void;
  allArticles: Article[];
}

export const ArticleView: React.FC<ArticleViewProps> = ({
  article,
  onBack,
  isBookmarked,
  onToggleBookmark,
  onSelectArticle,
  allArticles
}) => {
  // Audio state
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1);
  const [audioProgress, setAudioProgress] = useState(0);

  // Text size state: 'sm' | 'base' | 'lg'
  const [textSize, setTextSize] = useState<'sm' | 'base' | 'lg'>('base');

  // Share state
  const [isCopied, setIsCopied] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);

  // Scroll reading progress
  const [scrollProgress, setScrollProgress] = useState(0);

  // Comments state
  const [comments, setComments] = useState<Comment[]>(article.comments);
  const [newCommentText, setNewCommentText] = useState('');
  const [newCommentAuthor, setNewCommentAuthor] = useState('');

  // Handle scroll progress
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const currentProgress = (window.scrollY / totalHeight) * 100;
        setScrollProgress(Math.min(100, Math.max(0, currentProgress)));
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Audio simulator tick
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlayingAudio) {
      interval = setInterval(() => {
        setAudioProgress(prev => {
          if (prev >= 100) {
            setIsPlayingAudio(false);
            return 0;
          }
          return prev + 1 * playbackSpeed;
        });
      }, 500);
    }
    return () => clearInterval(interval);
  }, [isPlayingAudio, playbackSpeed]);

  const handleCopyLink = () => {
    navigator.clipboard?.writeText(window.location.href);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2500);
  };

  const handlePostComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCommentText.trim()) return;

    const newComment: Comment = {
      id: `c-${Date.now()}`,
      author: newCommentAuthor.trim() || 'CNN Reader',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80',
      timestamp: 'Just now',
      text: newCommentText.trim(),
      likes: 1
    };

    setComments(prev => [newComment, ...prev]);
    setNewCommentText('');
  };

  const handleLikeComment = (commentId: string) => {
    setComments(prev =>
      prev.map(c => (c.id === commentId ? { ...c, likes: c.likes + 1 } : c))
    );
  };

  // Font size classes
  const fontClass = textSize === 'sm' ? 'text-sm leading-relaxed' : textSize === 'lg' ? 'text-xl leading-loose' : 'text-base sm:text-lg leading-relaxed';

  const relatedArticles = allArticles.filter(a => a.id !== article.id).slice(0, 3);

  return (
    <div className="min-h-screen bg-white">
      {/* Sticky Reading Progress Bar */}
      <div className="fixed top-0 left-0 right-0 h-1 bg-neutral-200 z-50">
        <div 
          className="h-full bg-[#CC0000] transition-all duration-150"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Navigation & Utilities */}
        <div className="flex items-center justify-between gap-4 mb-6 pb-4 border-b border-neutral-200">
          <button
            onClick={onBack}
            className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-neutral-600 hover:text-[#CC0000] transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Front Page</span>
          </button>

          {/* Action Toolbar */}
          <div className="flex items-center gap-2">
            {/* Font size toggler */}
            <div className="hidden sm:flex items-center bg-neutral-100 rounded p-0.5 border border-neutral-200 text-xs">
              <span className="px-2 text-neutral-400 font-bold flex items-center">
                <Type className="w-3.5 h-3.5" />
              </span>
              <button
                onClick={() => setTextSize('sm')}
                className={`px-2 py-0.5 rounded cursor-pointer ${textSize === 'sm' ? 'bg-white font-bold text-black shadow-xs' : 'text-neutral-600'}`}
                title="Small text"
              >
                A-
              </button>
              <button
                onClick={() => setTextSize('base')}
                className={`px-2 py-0.5 rounded cursor-pointer ${textSize === 'base' ? 'bg-white font-bold text-black shadow-xs' : 'text-neutral-600'}`}
                title="Default text"
              >
                A
              </button>
              <button
                onClick={() => setTextSize('lg')}
                className={`px-2 py-0.5 rounded cursor-pointer ${textSize === 'lg' ? 'bg-white font-bold text-black shadow-xs' : 'text-neutral-600'}`}
                title="Large text"
              >
                A+
              </button>
            </div>

            {/* Bookmark button */}
            <button
              onClick={onToggleBookmark}
              className={`flex items-center gap-1 px-3 py-1.5 rounded text-xs font-semibold border transition-colors cursor-pointer ${
                isBookmarked 
                  ? 'bg-red-50 text-[#CC0000] border-red-200' 
                  : 'bg-white text-neutral-700 border-neutral-300 hover:bg-neutral-100'
              }`}
            >
              <Bookmark className={`w-3.5 h-3.5 ${isBookmarked ? 'fill-current' : ''}`} />
              <span className="hidden sm:inline">{isBookmarked ? 'Saved' : 'Save'}</span>
            </button>

            {/* Share button */}
            <button
              onClick={() => setShowShareModal(true)}
              className="flex items-center gap-1 px-3 py-1.5 rounded text-xs font-semibold bg-white text-neutral-700 border border-neutral-300 hover:bg-neutral-100 transition-colors cursor-pointer"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Share</span>
            </button>
          </div>
        </div>

        {/* Category & Status */}
        <div className="flex items-center gap-2 mb-3">
          {article.isBreaking && (
            <span className="bg-[#CC0000] text-white text-[11px] font-black uppercase tracking-wider px-2 py-0.5 rounded">
              Breaking
            </span>
          )}
          {article.isLive && (
            <span className="flex items-center gap-1 text-[11px] font-bold text-[#CC0000] uppercase tracking-wider bg-red-50 px-2 py-0.5 rounded border border-red-200">
              <Radio className="w-3 h-3 animate-pulse" /> Live Coverage
            </span>
          )}
          <span className="text-xs font-bold text-neutral-500 uppercase tracking-widest font-mono">
            {article.category}
          </span>
        </div>

        {/* Primary Headline */}
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black font-headline text-neutral-900 leading-[1.08] tracking-tight">
          {article.title}
        </h1>

        {/* Deck */}
        <p className="mt-3 text-lg sm:text-xl text-neutral-600 leading-snug font-medium">
          {article.deck}
        </p>

        {/* Byline & Timestamps */}
        <div className="mt-5 pb-5 border-b border-neutral-200 flex flex-wrap items-center justify-between gap-4 text-xs text-neutral-600">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full overflow-hidden bg-neutral-200 shrink-0">
              <img
                src={article.authorAvatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80'}
                alt={article.author}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <div className="font-bold text-neutral-900 text-sm">By {article.author}</div>
              <div className="text-neutral-500">{article.authorRole}</div>
            </div>
          </div>

          <div className="flex items-center gap-3 text-neutral-500 font-mono text-xs">
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" /> {article.publishedAt}
            </span>
            <span>·</span>
            <span>{article.readTime}</span>
          </div>
        </div>

        {/* Audio Player Bar: Listen to this story */}
        <div className="my-6 p-4 bg-neutral-50 border border-neutral-200 rounded-md">
          <div className="flex items-center justify-between gap-3 mb-2 flex-wrap">
            <div className="flex items-center gap-2">
              <div className="p-1.5 bg-red-100 text-[#CC0000] rounded">
                <Headphones className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-500 block">
                  CNN Audio Dispatch
                </span>
                <span className="text-xs font-bold text-neutral-900">
                  Listen to this article narration
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {/* Play / Pause button */}
              <button
                onClick={() => setIsPlayingAudio(!isPlayingAudio)}
                className="flex items-center gap-1.5 px-3 py-1 bg-[#CC0000] hover:bg-red-700 text-white rounded text-xs font-bold transition-colors cursor-pointer"
              >
                {isPlayingAudio ? (
                  <>
                    <Pause className="w-3.5 h-3.5" />
                    <span>Pause</span>
                  </>
                ) : (
                  <>
                    <Play className="w-3.5 h-3.5 fill-white" />
                    <span>Listen (4:12)</span>
                  </>
                )}
              </button>

              {/* Speed toggle */}
              <button
                onClick={() => {
                  const speeds = [1, 1.25, 1.5, 2];
                  const nextIdx = (speeds.indexOf(playbackSpeed) + 1) % speeds.length;
                  setPlaybackSpeed(speeds[nextIdx]);
                }}
                className="px-2 py-1 bg-white border border-neutral-300 rounded text-xs font-mono text-neutral-700 hover:bg-neutral-100 cursor-pointer font-bold"
                title="Playback speed"
              >
                {playbackSpeed}x
              </button>

              {/* Reset */}
              <button
                onClick={() => {
                  setAudioProgress(0);
                  setIsPlayingAudio(false);
                }}
                className="p-1.5 text-neutral-500 hover:text-black cursor-pointer"
                title="Restart audio"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Audio progress bar */}
          <div 
            onClick={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              const clickX = e.clientX - rect.left;
              setAudioProgress(Math.round((clickX / rect.width) * 100));
            }}
            className="w-full h-1.5 bg-neutral-200 rounded-full cursor-pointer relative overflow-hidden"
          >
            <div
              className="h-full bg-[#CC0000] transition-all"
              style={{ width: `${audioProgress}%` }}
            />
          </div>
        </div>

        {/* Lead Hero Photograph */}
        <figure className="my-6">
          <div className="rounded-md overflow-hidden bg-neutral-900 shadow-sm">
            <img
              src={article.imageUrl}
              alt={article.title}
              referrerPolicy="no-referrer"
              className="w-full h-auto aspect-[16/9] object-cover"
            />
          </div>
          <figcaption className="text-xs text-neutral-500 italic mt-2.5 leading-relaxed">
            {article.imageCaption}
          </figcaption>
        </figure>

        {/* Key Takeaways Box */}
        <div className="my-8 p-5 bg-neutral-50 border border-neutral-300 rounded-md">
          <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-900 mb-3 flex items-center gap-2">
            <span className="w-2 h-2 bg-[#CC0000]" />
            Key Facts & Takeaways
          </h3>
          <ul className="space-y-2.5">
            {article.keyTakeaways.map((point, idx) => (
              <li key={idx} className="flex items-start gap-2.5 text-sm sm:text-base text-neutral-800 leading-snug">
                <span className="font-bold text-[#CC0000] text-sm shrink-0">·</span>
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Article Body Prose */}
        <div className={`space-y-5 text-neutral-800 ${fontClass}`}>
          {article.paragraphs.map((p, idx) => (
            <React.Fragment key={idx}>
              <p className={idx === 0 ? 'first-letter:text-5xl first-letter:font-bold first-letter:font-headline first-letter:float-left first-letter:mr-3 first-letter:mt-1 first-letter:text-neutral-900' : ''}>
                {p}
              </p>

              {/* Injected Pull Quote midway */}
              {idx === 2 && article.pullQuote && (
                <div className="my-8 py-5 border-y-2 border-neutral-900 text-center px-4 bg-neutral-50/60">
                  <blockquote className="text-xl sm:text-2xl font-editorial italic font-semibold text-neutral-900 leading-snug">
                    "{article.pullQuote.text}"
                  </blockquote>
                  <cite className="block mt-2 text-xs font-bold uppercase tracking-wider text-neutral-500 not-italic">
                    — {article.pullQuote.attribution}
                  </cite>
                </div>
              )}
            </React.Fragment>
          ))}
        </div>

        {/* Interactive Comments Section */}
        <section className="mt-12 pt-8 border-t-2 border-neutral-900">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-[#CC0000]" />
              <h3 className="text-xl font-bold font-headline text-neutral-900">
                Discussion ({comments.length})
              </h3>
            </div>
            <span className="text-xs text-neutral-500">
              Community Guidelines Apply
            </span>
          </div>

          {/* Comment Submission Form */}
          <form onSubmit={handlePostComment} className="mb-8 p-4 bg-neutral-50 border border-neutral-200 rounded-md">
            <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-700 mb-2">
              Join the Conversation
            </h4>
            <div className="mb-3">
              <input
                type="text"
                placeholder="Your name or pseudonym (optional)"
                value={newCommentAuthor}
                onChange={(e) => setNewCommentAuthor(e.target.value)}
                className="w-full text-xs px-3 py-2 border border-neutral-300 rounded bg-white focus:outline-none focus:border-[#CC0000]"
              />
            </div>
            <div className="mb-3">
              <textarea
                rows={3}
                placeholder="Share your perspective on this report..."
                value={newCommentText}
                onChange={(e) => setNewCommentText(e.target.value)}
                className="w-full text-sm px-3 py-2 border border-neutral-300 rounded bg-white focus:outline-none focus:border-[#CC0000] resize-none"
                required
              />
            </div>
            <div className="flex justify-end">
              <button
                type="submit"
                className="flex items-center gap-1.5 px-4 py-2 bg-[#CC0000] hover:bg-red-700 text-white rounded text-xs font-bold transition-colors cursor-pointer shadow-xs"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Post Comment</span>
              </button>
            </div>
          </form>

          {/* Comments List */}
          <div className="space-y-4">
            {comments.map((comment) => (
              <div key={comment.id} className="p-4 border border-neutral-200 rounded-md bg-white">
                <div className="flex items-center justify-between text-xs text-neutral-500 mb-2">
                  <div className="flex items-center gap-2">
                    <img
                      src={comment.avatar}
                      alt={comment.author}
                      referrerPolicy="no-referrer"
                      className="w-6 h-6 rounded-full object-cover"
                    />
                    <span className="font-bold text-neutral-900">{comment.author}</span>
                  </div>
                  <span className="font-mono">{comment.timestamp}</span>
                </div>
                <p className="text-sm text-neutral-800 leading-relaxed">
                  {comment.text}
                </p>
                <div className="mt-3 flex items-center justify-between pt-2 border-t border-neutral-100 text-xs">
                  <button
                    onClick={() => handleLikeComment(comment.id)}
                    className="flex items-center gap-1.5 text-neutral-500 hover:text-[#CC0000] transition-colors cursor-pointer"
                  >
                    <ThumbsUp className="w-3.5 h-3.5" />
                    <span>Agree ({comment.likes})</span>
                  </button>
                  <span className="text-neutral-400">Verified Reader</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Related Coverage */}
        <section className="mt-14 pt-8 border-t border-neutral-200">
          <h3 className="text-xl font-bold font-headline uppercase tracking-tight text-neutral-900 mb-6">
            Related Coverage
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedArticles.map((rel) => (
              <div
                key={rel.id}
                onClick={() => {
                  onSelectArticle(rel);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="group cursor-pointer flex flex-col justify-between"
              >
                <div>
                  <div className="overflow-hidden rounded bg-neutral-100 mb-2.5">
                    <img
                      src={rel.imageUrl}
                      alt={rel.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-36 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <span className="text-[11px] font-bold text-[#CC0000] uppercase tracking-wide block mb-1">
                    {rel.category}
                  </span>
                  <h4 className="text-sm font-bold text-neutral-900 font-headline group-hover:text-[#CC0000] transition-colors line-clamp-2 leading-snug">
                    {rel.title}
                  </h4>
                </div>
                <span className="text-xs text-neutral-500 mt-2 block font-mono">
                  {rel.readTime}
                </span>
              </div>
            ))}
          </div>
        </section>
      </article>

      {/* Share Modal Dialog */}
      {showShareModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-sm w-full p-5 shadow-2xl border border-neutral-200">
            <h3 className="text-base font-bold font-headline text-neutral-900 mb-1">
              Share This Article
            </h3>
            <p className="text-xs text-neutral-500 mb-4 line-clamp-2">
              "{article.title}"
            </p>

            <div className="space-y-3">
              <button
                onClick={handleCopyLink}
                className="w-full flex items-center justify-between px-3 py-2.5 bg-neutral-50 hover:bg-neutral-100 border border-neutral-200 rounded text-xs font-semibold text-neutral-800 transition-colors cursor-pointer"
              >
                <span className="flex items-center gap-2">
                  <Copy className="w-4 h-4 text-neutral-500" />
                  <span>Copy Article Link</span>
                </span>
                {isCopied ? (
                  <span className="text-emerald-600 flex items-center gap-1 font-bold">
                    <Check className="w-3.5 h-3.5" /> Copied!
                  </span>
                ) : (
                  <span className="text-neutral-400 text-[11px]">Click to copy</span>
                )}
              </button>

              <a
                href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(article.title)}`}
                target="_blank"
                rel="noreferrer"
                className="w-full flex items-center gap-2 px-3 py-2.5 bg-neutral-900 hover:bg-black text-white rounded text-xs font-semibold transition-colors justify-center"
              >
                <span>Share on X (Twitter)</span>
              </a>

              <a
                href={`mailto:?subject=${encodeURIComponent(article.title)}&body=${encodeURIComponent(article.deck)}`}
                className="w-full flex items-center gap-2 px-3 py-2.5 bg-neutral-100 hover:bg-neutral-200 text-neutral-800 rounded text-xs font-semibold transition-colors justify-center"
              >
                <span>Share via Email</span>
              </a>
            </div>

            <button
              onClick={() => setShowShareModal(false)}
              className="mt-4 w-full py-2 text-xs font-semibold text-neutral-600 hover:text-black border-t border-neutral-200 cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
