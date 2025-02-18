
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { NewsHeader } from '@/components/NewsHeader';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Skeleton } from '@/components/ui/skeleton';

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

  const paragraphs = article.content.split('\n\n');

  return (
    <div className="min-h-screen bg-white">
      <div className="border-b border-black">
        <div className="container mx-auto px-4 py-2">
          <div className="text-center text-sm border-b border-gray-300 pb-2 mb-2">
            VOL. 127 - NO. 39 • BEND THE CURVE • PAGE 2
          </div>
        </div>
      </div>
      <NewsHeader />
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-12 gap-8">
          {/* Title Section */}
          <div className="col-span-12 mb-8">
            <div className="border-b-2 border-black pb-4 mb-6">
              <h1 className="font-serif text-5xl mb-4">{article.title}</h1>
              {article.subtitle && (
                <h2 className="font-serif text-2xl text-gray-700 mb-4">{article.subtitle}</h2>
              )}
            </div>
          </div>

          {/* Main Content Area */}
          <div className="col-span-8">
            <div className="prose prose-lg max-w-none">
              <div className="font-serif text-base leading-relaxed columns-2 gap-8">
                {paragraphs.map((paragraph, index) => {
                  if (paragraph.startsWith('##')) {
                    const headingText = paragraph.replace('##', '').trim();
                    return (
                      <h3 key={index} className="text-xl font-serif mt-6 mb-4 column-span-all">
                        {headingText}
                      </h3>
                    );
                  }
                  return <p key={index} className="mb-4">{paragraph}</p>;
                })}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="col-span-4">
            <div className="bg-gray-50 p-6 mb-6">
              <h3 className="font-serif text-xl mb-4 uppercase border-b border-gray-300 pb-2">
                Good News
              </h3>
              <p className="text-sm text-gray-700 mb-4">
                {article.inspiration || "Latest updates in artificial intelligence and technology."}
              </p>
            </div>

            {/* Related Articles */}
            <div className="border-t-2 border-black pt-4">
              <h3 className="font-serif text-xl mb-4">Related Stories</h3>
              <div className="space-y-4">
                {article.related_articles?.slice(0, 3).map((related: any, index: number) => (
                  <div key={index} className="pb-4 border-b border-gray-200">
                    <h4 className="font-serif text-lg mb-2">{related.title}</h4>
                    <p className="text-sm text-gray-600">{related.excerpt}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Footer Info */}
          <div className="col-span-12 mt-8 pt-4 border-t border-black">
            <div className="text-sm text-gray-600">
              By {article.author} • Published {formattedDate} • {article.read_time}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default DynamicArticle;
