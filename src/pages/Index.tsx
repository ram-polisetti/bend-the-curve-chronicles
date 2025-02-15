
import { useEffect, useState } from 'react';
import { NewsHeader } from "@/components/NewsHeader";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { User } from '@supabase/supabase-js';

interface Article {
  id: string;
  title: string;
  subtitle: string | null;
  content: string;
  read_time: string;
  author: string;
  created_at: string;
  category: string;
}

interface ArticleWithDifficulty extends Article {
  difficulty_level: number;
  prerequisites: string[];
}

const Index = () => {
  const [articles, setArticles] = useState<ArticleWithDifficulty[]>([]);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    fetchArticles();
    
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const fetchArticles = async () => {
    const { data, error } = await supabase
      .from('articles')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching articles:', error);
      return;
    }

    const processedArticles = (data || []).map(article => ({
      ...article,
      difficulty_level: article.category === 'deep-learning' || article.category === 'reinforcement-learning' ? 2 : 1,
      prerequisites: []
    }));

    setArticles(processedArticles);
  };

  return (
    <div className="min-h-screen bg-white">
      <NewsHeader />
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-12 gap-8">
          {/* Left Column */}
          <div className="col-span-3">
            <h2 className="font-serif text-2xl mb-4 border-b border-black pb-2">
              Headlines
            </h2>
            <div className="space-y-6">
              {articles.slice(1, 4).map(article => (
                <article key={article.id} className="border-b border-gray-200 pb-4">
                  <Link to={`/articles/${article.id}`} className="group">
                    <h3 className="font-serif text-lg group-hover:text-gray-800">
                      {article.title}
                    </h3>
                    <div className="text-xs text-gray-600 mt-2">
                      By {article.author}
                    </div>
                  </Link>
                </article>
              ))}
            </div>
          </div>

          {/* Main Content */}
          <div className="col-span-6">
            {articles.length > 0 && (
              <article className="mb-8 border-b border-black pb-8">
                <Link to={`/articles/${articles[0].id}`} className="group">
                  <h1 className="font-serif text-5xl mb-4 leading-tight">
                    {articles[0].title}
                  </h1>
                  {articles[0].subtitle && (
                    <p className="text-xl text-gray-700 font-serif mb-4">
                      {articles[0].subtitle}
                    </p>
                  )}
                  <div className="text-sm text-gray-600">
                    {articles[0].read_time} • By {articles[0].author}
                  </div>
                </Link>
              </article>
            )}

            {/* Breaking News Section */}
            <div className="mt-8">
              <h2 className="font-serif text-3xl mb-6 border-b border-black pb-2">
                Breaking News
              </h2>
              <div className="grid grid-cols-2 gap-8">
                {articles.slice(4, 8).map(article => (
                  <article key={article.id} className="border-b border-gray-200 pb-6">
                    <Link to={`/articles/${article.id}`} className="group">
                      <h3 className="font-serif text-xl mb-2 group-hover:text-gray-800">
                        {article.title}
                      </h3>
                      <p className="text-sm text-gray-600 line-clamp-2">
                        {article.subtitle}
                      </p>
                      <div className="text-xs text-gray-600 mt-2">
                        By {article.author}
                      </div>
                    </Link>
                  </article>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Latest News */}
          <div className="col-span-3">
            <h2 className="font-serif text-2xl mb-4 border-b border-black pb-2">
              Latest News
            </h2>
            <div className="space-y-4">
              {articles.slice(8, 14).map(article => (
                <article key={article.id} className="border-b border-gray-200 pb-3">
                  <Link to={`/articles/${article.id}`} className="group">
                    <h3 className="text-sm font-serif group-hover:text-gray-800">
                      {article.title}
                    </h3>
                    <div className="text-xs text-gray-600 mt-1">
                      {new Date(article.created_at).toLocaleDateString()}
                    </div>
                  </Link>
                </article>
              ))}
            </div>
          </div>
        </div>

        {articles.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            No articles available.
          </div>
        )}
      </main>
    </div>
  );
};

export default Index;
