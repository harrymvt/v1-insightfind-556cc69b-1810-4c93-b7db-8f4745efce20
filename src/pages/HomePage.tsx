import React, { useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useDebounce } from 'react-use';
import { Search, BookOpen, XCircle } from 'lucide-react';
import { useArticleStore, useFetchArticles } from '@/hooks/useArticleStore';
import { ArticleCard, ArticleCardSkeleton } from '@/components/ArticleCard';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
export function HomePage() {
  const fetchArticles = useFetchArticles();
  const articles = useArticleStore((s) => s.articles);
  const loading = useArticleStore((s) => s.loading);
  const error = useArticleStore((s) => s.error);
  const selectedTopic = useArticleStore((s) => s.selectedTopic);
  const setSelectedTopic = useArticleStore((s) => s.setSelectedTopic);
  const searchQuery = useArticleStore((s) => s.searchQuery);
  const setSearchQuery = useArticleStore((s) => s.setSearchQuery);
  const [localSearch, setLocalSearch] = useState(searchQuery);
  useDebounce(() => setSearchQuery(localSearch), 300, [localSearch]);
  useEffect(() => {
    fetchArticles();
  }, [fetchArticles]);
  const topics = useMemo(() => {
    if (!articles.length) return [];
    const allTopics = new Set(articles.map((article) => article.topic));
    return ['All', ...Array.from(allTopics).sort()];
  }, [articles]);
  const filteredArticles = useMemo(() => {
    return articles.filter((article) => {
      const topicMatch = selectedTopic === 'All' || article.topic === selectedTopic;
      const searchMatch = article.title.toLowerCase().includes(searchQuery.toLowerCase());
      return topicMatch && searchMatch;
    });
  }, [articles, searchQuery, selectedTopic]);
  const renderContent = () => {
    if (loading) {
      return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {Array.from({ length: 6 }).map((_, i) => (
            <ArticleCardSkeleton key={i} />
          ))}
        </div>
      );
    }
    if (error) {
      return (
        <div className="text-center py-16 text-destructive flex flex-col items-center gap-4">
          <XCircle className="w-12 h-12" />
          <h3 className="text-2xl font-semibold">An Error Occurred</h3>
          <p className="text-muted-foreground">{error}</p>
        </div>
      );
    }
    if (filteredArticles.length === 0) {
      return (
        <div className="text-center py-16 flex flex-col items-center gap-4">
          <Search className="w-12 h-12 text-muted-foreground" />
          <h3 className="text-2xl font-semibold">No Articles Found</h3>
          <p className="text-muted-foreground">Try adjusting your search or filters.</p>
        </div>
      );
    }
    return (
      <AnimatePresence>
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
        >
          {filteredArticles.map((article, index) => (
            <ArticleCard key={article.url} article={article} index={index} />
          ))}
        </motion.div>
      </AnimatePresence>
    );
  };
  return (
    <div className="bg-background min-h-screen font-sans text-foreground">
      <header className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex items-center gap-2">
          <BookOpen className="w-6 h-6 text-primary" />
          <h1 className="text-2xl font-bold font-display tracking-tight">InsightFind</h1>
        </div>
      </header>
      <main>
        <div className="relative bg-gradient-hero">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 text-center">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-4xl md:text-5xl font-display font-bold tracking-tight text-foreground"
            >
              Discover Your Next Great Read
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground"
            >
              An attractive, minimalist search interface to browse and filter a collection of articles.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mt-8 max-w-xl mx-auto"
            >
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search articles by title..."
                  className="w-full pl-12 pr-4 py-3 h-12 text-base rounded-full shadow-sm bg-background/80 focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background"
                  value={localSearch}
                  onChange={(e) => setLocalSearch(e.target.value)}
                />
              </div>
            </motion.div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-8 md:py-10 lg:py-12">
            <div className="flex justify-center flex-wrap gap-2 mb-10">
              {topics.map((topic) => (
                <Button
                  key={topic}
                  variant={selectedTopic === topic ? 'default' : 'outline'}
                  onClick={() => setSelectedTopic(topic)}
                  className={cn(
                    'rounded-full transition-all duration-200',
                    selectedTopic === topic && 'shadow-md'
                  )}
                >
                  {topic}
                </Button>
              ))}
            </div>
            {renderContent()}
          </div>
        </div>
      </main>
      <footer className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 text-center text-sm text-muted-foreground">
        <p>Built with ❤️ at Cloudflare</p>
      </footer>
    </div>
  );
}