
import { useEffect, useState } from 'react';
import { NewsHeader } from "@/components/NewsHeader";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { MainHeadline } from "@/components/home/MainHeadline";
import { TopArticlesGrid } from "@/components/home/TopArticlesGrid";
import { TrendingSidebar } from "@/components/home/TrendingSidebar";
import { MoreStories } from "@/components/home/MoreStories";

interface Article {
  id: string;
  title: string;
  subtitle: string | null;
  content: string;
  read_time: string;
  author: string;
  created_at: string;
  hero_image: string | null;
  views: number;
  category: string;
}

const Index = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    fetchArticles();
  }, []);

  const fetchArticles = async () => {
    try {
      const { data, error } = await supabase
        .from('articles')
        .select('*')
        .order('views', { ascending: false });

      if (error) throw error;
      setArticles(data || []);
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive"
      });
    }
  };

  const mainArticle = articles[0];
  const topSectionArticles = articles.slice(1, 4);
  const sidebarArticles = articles.slice(4, 8);
  const remainingArticles = articles.slice(8);

  return (
    <div className="min-h-screen bg-white">
      <NewsHeader />
      <div className="container mx-auto px-4">
        <div className="max-w-[2000px] mx-auto">
          <MainHeadline article={mainArticle} />
          <div className="grid grid-cols-3 gap-8 mt-8">
            <TopArticlesGrid articles={topSectionArticles} />
            <TrendingSidebar articles={sidebarArticles} />
          </div>
          <MoreStories articles={remainingArticles} />
        </div>
      </div>
    </div>
  );
};

export default Index;
