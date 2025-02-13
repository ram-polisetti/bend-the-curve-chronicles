
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ArticleTemplate } from '@/components/ArticleTemplate';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import MDEditor from '@uiw/react-md-editor';

interface Article {
  id: string;
  title: string;
  subtitle: string | null;
  content: string;
  read_time: string;
  author: string;
  created_at: string;
  category: string;
  inspiration?: string;  // Made optional with ?
  author_id: string;
  published_at: string;
  volume: number;
  issue_number: number;
  next_in_issue: any | null;
  related_articles: any | null;
}

const DynamicArticle = () => {
  const { id } = useParams();
  const [article, setArticle] = useState<Article | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    const fetchArticle = async () => {
      const { data, error } = await supabase
        .from('articles')
        .select('*')
        .eq('id', id)
        .single();

      if (error) {
        toast({
          title: "Error",
          description: "Failed to load article",
          variant: "destructive"
        });
        return;
      }

      setArticle(data as Article);
    };

    fetchArticle();
  }, [id]);

  if (!article) return null;

  const formattedDate = new Date(article.created_at).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <ArticleTemplate
      title={article.title}
      subtitle={article.subtitle || ""}
      author={article.author || "Anonymous"}
      date={formattedDate}
      readTime={article.read_time}
      content={
        <div>
          {article.inspiration && (
            <div className="mb-8 p-4 bg-gray-50 rounded-lg">
              <h2 className="font-serif text-2xl mb-4">Author's Note</h2>
              <p className="text-gray-700">{article.inspiration}</p>
            </div>
          )}
          <div className="md:columns-2 gap-8 [&>p]:mb-4 prose-newspaper">
            <MDEditor.Markdown 
              source={article.content} 
              className="whitespace-pre-wrap"
            />
          </div>
        </div>
      }
      relatedArticles={[
        {
          title: "AI Models Achieve Human-Level Reasoning",
          path: "/articles/ai-human-reasoning",
          category: "AI Research"
        },
        {
          title: "Neural Networks Scale New Heights",
          path: "/articles/neural-networks",
          category: "Deep Learning"
        },
        {
          title: "Deep Learning Trends to Watch",
          path: "/articles/deep-learning-trends",
          category: "Deep Learning"
        }
      ]}
      nextInIssue={[
        {
          title: "Vision Models Surpass Expert Performance",
          path: "/articles/vision-models",
          category: "Deep Learning",
          excerpt: "Recent advancements in vision models have led to unprecedented accuracy."
        },
        {
          title: "Quantum ML Shows Promise",
          path: "/articles/quantum-ml",
          category: "Quantum Computing",
          excerpt: "Hybrid quantum-classical algorithms achieve new performance milestones."
        },
        {
          title: "Global AI Regulations Take Shape",
          path: "/articles/ai-regulations",
          category: "Policy",
          excerpt: "New framework aims to balance innovation with ethical considerations."
        }
      ]}
    />
  );
};

export default DynamicArticle;
