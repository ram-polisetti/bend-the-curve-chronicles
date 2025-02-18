
import { useEffect, useState } from 'react';
import { NewsHeader } from "@/components/NewsHeader";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

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
          {/* Main Headline */}
          {mainArticle && (
            <div className="border-b-2 border-black py-6">
              <span className="text-xs font-bold uppercase tracking-wider">Most Popular</span>
              <Link to={`/articles/${mainArticle.id}`} className="group">
                {mainArticle.hero_image && (
                  <img 
                    src={mainArticle.hero_image} 
                    alt={mainArticle.title}
                    className="w-full h-[500px] object-cover rounded-lg mb-4"
                  />
                )}
                <h1 className="font-serif text-7xl text-black mt-2 mb-6 leading-none group-hover:text-gray-800">
                  {mainArticle.title}
                </h1>
                <div className="text-xl font-serif leading-relaxed group-hover:text-gray-700">
                  {mainArticle.subtitle}
                </div>
                <div className="flex items-center justify-between mt-4">
                  <span className="text-sm text-black group-hover:underline">
                    Continue Reading →
                  </span>
                  <span className="text-sm text-gray-500">
                    {mainArticle.views.toLocaleString()} views
                  </span>
                </div>
              </Link>
            </div>
          )}

          {/* Three Column Grid */}
          <div className="grid grid-cols-3 gap-8 mt-8">
            {/* Top Articles */}
            <div className="col-span-2 grid grid-cols-2 gap-6">
              {topSectionArticles.map((article) => (
                <article key={article.id} className="border-b border-gray-200 pb-6">
                  <Link to={`/articles/${article.id}`} className="group">
                    {article.hero_image && (
                      <img 
                        src={article.hero_image} 
                        alt={article.title}
                        className="w-full h-[200px] object-cover rounded-lg mb-4"
                      />
                    )}
                    <h2 className="font-serif text-2xl group-hover:text-gray-800">
                      {article.title}
                    </h2>
                    {article.subtitle && (
                      <p className="text-gray-600 mt-2 group-hover:text-gray-700">
                        {article.subtitle}
                      </p>
                    )}
                    <div className="flex items-center justify-between mt-4">
                      <span className="text-sm text-black group-hover:underline">
                        Continue Reading →
                      </span>
                      <span className="text-sm text-gray-500">
                        {article.views.toLocaleString()} views
                      </span>
                    </div>
                  </Link>
                </article>
              ))}
            </div>

            {/* Sidebar */}
            <div className="border-l border-gray-200 pl-6">
              <h2 className="font-serif text-2xl mb-6 border-b border-black pb-2">
                Trending Now
              </h2>
              <div className="space-y-6">
                {sidebarArticles.map((article) => (
                  <article key={article.id}>
                    <Link to={`/articles/${article.id}`} className="group">
                      <span className="text-xs uppercase tracking-wider text-gray-600">
                        {article.category}
                      </span>
                      <h3 className="font-serif text-xl mt-1 group-hover:text-gray-800">
                        {article.title}
                      </h3>
                      <div className="flex items-center justify-between mt-2">
                        <span className="text-sm text-gray-500">
                          {new Date(article.created_at).toLocaleDateString()}
                        </span>
                        <span className="text-sm text-gray-500">
                          {article.views.toLocaleString()} views
                        </span>
                      </div>
                    </Link>
                  </article>
                ))}
              </div>
            </div>
          </div>

          {/* Additional Articles */}
          {remainingArticles.length > 0 && (
            <div className="mt-12 border-t border-black pt-8">
              <h2 className="font-serif text-2xl mb-6">More Stories</h2>
              <div className="grid grid-cols-4 gap-6">
                {remainingArticles.map((article) => (
                  <article key={article.id}>
                    <Link to={`/articles/${article.id}`} className="group">
                      {article.hero_image && (
                        <img 
                          src={article.hero_image} 
                          alt={article.title}
                          className="w-full h-[150px] object-cover rounded-lg mb-4"
                        />
                      )}
                      <h3 className="font-serif text-xl group-hover:text-gray-800">
                        {article.title}
                      </h3>
                      <div className="flex items-center justify-between mt-2">
                        <span className="text-sm text-gray-500">
                          {article.read_time}
                        </span>
                        <span className="text-sm text-gray-500">
                          {article.views.toLocaleString()} views
                        </span>
                      </div>
                    </Link>
                  </article>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Index;
