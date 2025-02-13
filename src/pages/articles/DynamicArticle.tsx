
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArticleTemplate } from '@/components/ArticleTemplate';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Skeleton } from '@/components/ui/skeleton';
import { useIsMobile } from '@/hooks/use-mobile';

interface Article {
  id: string;
  title: string;
  subtitle: string | null;
  content: string;
  read_time: string;
  author: string;
  created_at: string;
  category: string;
  related_articles: any | null;
  next_in_issue: any | null;
}

const DynamicArticle = () => {
  const { id } = useParams();
  const [article, setArticle] = useState<Article | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();
  const navigate = useNavigate();
  const isMobile = useIsMobile();

  useEffect(() => {
    const fetchArticle = async () => {
      setIsLoading(true);
      try {
        const { data, error } = await supabase
          .from('articles')
          .select('*')
          .eq('id', id)
          .maybeSingle();

        if (error) {
          throw error;
        }

        if (!data) {
          toast({
            title: "Article not found",
            description: "The requested article could not be found.",
            variant: "destructive"
          });
          navigate('/');
          return;
        }

        setArticle(data as Article);
      } catch (error: any) {
        toast({
          title: "Error",
          description: error.message || "Failed to load article",
          variant: "destructive"
        });
      } finally {
        setIsLoading(false);
      }
    };

    if (id) {
      fetchArticle();
    }
  }, [id, toast, navigate]);

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Skeleton className="h-12 w-3/4 mb-4" />
        <Skeleton className="h-6 w-1/2 mb-8" />
        <div className="space-y-4">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/4" />
        </div>
      </div>
    );
  }

  if (!article) return null;

  const formattedDate = new Date(article.created_at).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  const renderContent = () => {
    const paragraphs = article.content.split('\n\n');
    
    if (isMobile) {
      // Single column layout for mobile
      return (
        <div className="prose prose-lg max-w-none">
          {paragraphs.map((paragraph, index) => {
            if (paragraph.startsWith('##')) {
              const headingText = paragraph.replace('##', '').trim();
              const headingId = headingText.toLowerCase().replace(/[^a-z0-9]+/g, '-');
              return <h2 key={index} id={headingId} className="text-2xl font-serif mt-8 mb-4">{headingText}</h2>;
            } else if (paragraph.startsWith('-')) {
              const items = paragraph.split('\n').map(item => item.replace('-', '').trim());
              return (
                <ul key={index} className="list-disc pl-6 my-4">
                  {items.map((item, itemIndex) => (
                    <li key={itemIndex} className="my-2">{item}</li>
                  ))}
                </ul>
              );
            } else {
              return <p key={index} className="my-4">{paragraph}</p>;
            }
          })}
        </div>
      );
    }

    // Multi-column layout for desktop
    return (
      <div className="columns-2 gap-8 prose prose-lg max-w-none">
        {paragraphs.map((paragraph, index) => {
          if (paragraph.startsWith('##')) {
            const headingText = paragraph.replace('##', '').trim();
            const headingId = headingText.toLowerCase().replace(/[^a-z0-9]+/g, '-');
            return (
              <div key={index} className="break-inside-avoid-column mb-6">
                <h2 id={headingId} className="text-2xl font-serif mt-8 mb-4">{headingText}</h2>
              </div>
            );
          } else if (paragraph.startsWith('-')) {
            const items = paragraph.split('\n').map(item => item.replace('-', '').trim());
            return (
              <div key={index} className="break-inside-avoid-column mb-6">
                <ul className="list-disc pl-6 my-4">
                  {items.map((item, itemIndex) => (
                    <li key={itemIndex} className="my-2">{item}</li>
                  ))}
                </ul>
              </div>
            );
          } else {
            return (
              <p key={index} className="break-inside-avoid-column mb-6">
                {paragraph}
              </p>
            );
          }
        })}
      </div>
    );
  };

  return (
    <ArticleTemplate
      title={article.title}
      subtitle={article.subtitle || ""}
      author={article.author}
      date={formattedDate}
      readTime={article.read_time}
      content={renderContent()}
      relatedArticles={article.related_articles || []}
      nextInIssue={article.next_in_issue || []}
    />
  );
};

export default DynamicArticle;
