
import { NewsHeader } from "@/components/NewsHeader";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { MainHeadline } from "@/components/home/MainHeadline";
import { TopArticlesGrid } from "@/components/home/TopArticlesGrid";
import { TrendingSidebar } from "@/components/home/TrendingSidebar";
import { MoreStories } from "@/components/home/MoreStories";
import { Article } from "@/types/article";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";

const fetchArticles = async () => {
  console.log("Fetching articles...");
  const { data, error } = await supabase
    .from('articles')
    .select('*')
    .order('views', { ascending: false });

  if (error) {
    console.error("Error fetching articles:", error);
    throw error;
  }
  
  console.log("Articles fetched:", data);
  return data;
};

const Index = () => {
  const { toast } = useToast();
  const { data: articles = [], isLoading, error } = useQuery({
    queryKey: ['articles'],
    queryFn: fetchArticles
  });

  useEffect(() => {
    if (error) {
      console.error("Query error:", error);
      toast({
        title: "Error",
        description: (error as Error).message,
        variant: "destructive"
      });
    }
  }, [error, toast]);

  console.log("Rendering with:", { articles, isLoading, error });

  const mainArticle = articles[0];
  const topSectionArticles = articles.slice(1, 4);
  const sidebarArticles = articles.slice(4, 8);
  const remainingArticles = articles.slice(8);

  return (
    <div className="min-h-screen bg-white">
      <NewsHeader />
      <div className="container mx-auto px-4">
        <div className="max-w-[2000px] mx-auto">
          <MainHeadline article={mainArticle} isLoading={isLoading} />
          <div className="grid grid-cols-3 gap-8 mt-8">
            <TopArticlesGrid articles={topSectionArticles} isLoading={isLoading} />
            <TrendingSidebar articles={sidebarArticles} isLoading={isLoading} />
          </div>
          <MoreStories articles={remainingArticles} isLoading={isLoading} />
        </div>
      </div>
    </div>
  );
};

export default Index;
