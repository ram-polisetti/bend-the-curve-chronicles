
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { NewsHeader } from '@/components/NewsHeader';
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
  inspiration: string | null;
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

        if (error) throw error;

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

    if (id) fetchArticle();
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

    return (
      <div className="grid grid-cols-12 gap-8">
        {/* Main Image and Title Section */}
        <div className="col-span-12 mb-8">
          <div className="aspect-video bg-gray-200 mb-6"></div>
          <h1 className="font-serif text-5xl mb-4">{article.title}</h1>
          <div className="text-sm text-gray-600 mb-6">
            By {article.author} • {formattedDate} • {article.read_time}
          </div>
        </div>

        {/* Two Column Content Layout */}
        <div className="col-span-8">
          <div className="prose prose-lg max-w-none font-serif">
            {paragraphs.slice(0, Math.ceil(paragraphs.length / 2)).map((paragraph, index) => {
              if (paragraph.startsWith('##')) {
                const headingText = paragraph.replace('##', '').trim();
                return <h2 key={index} className="text-2xl font-serif mt-8 mb-4">{headingText}</h2>;
              } else if (paragraph.startsWith('-')) {
                const items = paragraph.split('\n').map(item => item.replace('-', '').trim());
                return (
                  <ul key={index} className="list-disc pl-6 my-4">
                    {items.map((item, itemIndex) => (
                      <li key={itemIndex} className="my-2">{item}</li>
                    ))}
                  </ul>
                );
              }
              return <p key={index} className="mb-4">{paragraph}</p>;
            })}
          </div>
        </div>

        {/* Side Column */}
        <div className="col-span-4 space-y-8">
          {/* Related Headlines */}
          <div className="bg-gray-50 p-6 rounded-lg">
            <h3 className="font-serif text-xl mb-4 border-b border-gray-200 pb-2">
              Related Headlines
            </h3>
            <div className="space-y-4">
              {article.related_articles?.slice(0, 4).map((related: any, index: number) => (
                <div key={index} className="border-b border-gray-100 pb-4 last:border-0">
                  <h4 className="font-serif text-lg">{related.title}</h4>
                  <p className="text-sm text-gray-600 mt-1">{related.excerpt}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Continue Article */}
          <div className="prose prose-lg max-w-none font-serif">
            {paragraphs.slice(Math.ceil(paragraphs.length / 2)).map((paragraph, index) => {
              if (paragraph.startsWith('##')) {
                const headingText = paragraph.replace('##', '').trim();
                return <h2 key={index} className="text-2xl font-serif mt-8 mb-4">{headingText}</h2>;
              } else if (paragraph.startsWith('-')) {
                const items = paragraph.split('\n').map(item => item.replace('-', '').trim());
                return (
                  <ul key={index} className="list-disc pl-6 my-4">
                    {items.map((item, itemIndex) => (
                      <li key={itemIndex} className="my-2">{item}</li>
                    ))}
                  </ul>
                );
              }
              return <p key={index} className="mb-4">{paragraph}</p>;
            })}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-white">
      <NewsHeader />
      <main className="container mx-auto px-4 py-8">
        {renderContent()}
      </main>
    </div>
  );
};

export default DynamicArticle;
