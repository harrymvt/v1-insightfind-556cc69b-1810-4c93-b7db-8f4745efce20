import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowUpRight } from 'lucide-react';
import { Article } from '@/types';
interface ArticleCardProps {
  article: Article;
  index: number;
}
const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.05,
      duration: 0.3,
      ease: 'easeOut' as const,
    },
  }),
};
export const ArticleCard: React.FC<ArticleCardProps> = ({ article, index }) => {
  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      custom={index}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      className="h-full"
    >
      <Card className="flex flex-col h-full bg-card/80 backdrop-blur-sm border-border/50 hover:border-primary/30 hover:shadow-lg transition-all duration-300">
        <CardHeader>
          <CardTitle className="text-lg font-semibold leading-tight text-foreground">
            {article.title}
          </CardTitle>
          <CardDescription className="pt-2">
            <Badge variant="secondary">{article.topic}</Badge>
          </CardDescription>
        </CardHeader>
        <CardContent className="flex-grow" />
        <CardFooter>
          <Button asChild variant="ghost" size="sm" className="w-full justify-start text-primary">
            <a href={article.url} target="_blank" rel="noopener noreferrer">
              Read More
              <ArrowUpRight className="ml-2 h-4 w-4" />
            </a>
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
};
export const ArticleCardSkeleton: React.FC = () => {
    return (
        <Card className="flex flex-col h-full">
            <CardHeader>
                <div className="h-6 bg-muted rounded w-3/4 animate-pulse"></div>
                <div className="h-4 bg-muted rounded w-1/2 mt-2 animate-pulse"></div>
            </CardHeader>
            <CardContent className="flex-grow" />
            <CardFooter>
                <div className="h-8 bg-muted rounded w-1/3 animate-pulse"></div>
            </CardFooter>
        </Card>
    );
};