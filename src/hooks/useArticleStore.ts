import { create } from 'zustand';
import Papa from 'papaparse';
import { Article } from '@/types';
import { useCallback } from 'react';
interface ArticleState {
  articles: Article[];
  searchQuery: string;
  selectedTopic: string;
  loading: boolean;
  error: string | null;
  fetchArticles: () => Promise<void>;
  setSearchQuery: (query: string) => void;
  setSelectedTopic: (topic: string) => void;
}
export const useArticleStore = create<ArticleState>((set) => ({
  articles: [],
  searchQuery: '',
  selectedTopic: 'All',
  loading: true,
  error: null,
  fetchArticles: async () => {
    set({ loading: true, error: null });
    try {
      const response = await fetch('/articles.csv');
      if (!response.ok) {
        throw new Error('Failed to fetch articles.csv');
      }
      const csvText = await response.text();
      Papa.parse<Article>(csvText, {
        header: true,
        skipEmptyLines: true,
        complete: (results) => {
          set({ articles: results.data, loading: false });
        },
        error: (error: Error) => {
          console.error('Error parsing CSV:', error);
          set({ error: 'Failed to parse articles data.', loading: false });
        },
      });
    } catch (error) {
      console.error('Error fetching articles:', error);
      const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred.';
      set({ error: errorMessage, loading: false });
    }
  },
  setSearchQuery: (query: string) => set({ searchQuery: query }),
  setSelectedTopic: (topic: string) => set({ selectedTopic: topic }),
}));
export const useFetchArticles = () => {
  const fetcher = useArticleStore((state) => state.fetchArticles);
  return useCallback(fetcher, [fetcher]);
};