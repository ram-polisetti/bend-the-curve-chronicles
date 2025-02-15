
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
          {/* Featured Image and Main Headline */}
          <div className="col-span-12 grid grid-cols-12 gap-8 mb-12">
            <div className="col-span-7">
              {articles.length > 0 && (
                <div className="aspect-video bg-gray-200 mb-4"></div>
              )}
              {articles.length > 0 && (
                <article>
                  <Link to={`/articles/${articles[0].id}`} className="group">
                    <h1 className="font-serif text-4xl mb-3 leading-tight">
                      {articles[0].title}
                    </h1>
                    <p className="text-base text-gray-700 font-serif">
                      {articles[0].subtitle}
                    </p>
                  </Link>
                </article>
              )}
            </div>
            
            {/* Right Side Headlines */}
            <div className="col-span-5 space-y-6">
              {articles.slice(1, 5).map(article => (
                <article key={article.id} className="border-b border-gray-200 pb-4">
                  <Link to={`/articles/${article.id}`} className="group">
                    <h3 className="font-serif text-xl mb-2 group-hover:text-gray-800">
                      {article.title}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {article.subtitle}
                    </p>
                  </Link>
                </article>
              ))}
            </div>
          </div>

          {/* Breaking News Section */}
          <div className="col-span-12 border-t border-b border-black py-6 mb-12">
            <h2 className="font-serif text-3xl mb-8">Breaking News</h2>
            <div className="grid grid-cols-12 gap-8">
              <div className="col-span-8">
                <p className="font-serif text-lg leading-relaxed">
                  {articles[5]?.content?.slice(0, 300)}...
                </p>
              </div>
              <div className="col-span-4 space-y-4">
                {articles.slice(6, 8).map(article => (
                  <article key={article.id}>
                    <Link to={`/articles/${article.id}`} className="group">
                      <h3 className="font-serif text-lg group-hover:text-gray-800">
                        {article.title}
                      </h3>
                    </Link>
                  </article>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom Grid */}
          <div className="col-span-12 grid grid-cols-12 gap-8">
            {/* Left Column */}
            <div className="col-span-4">
              {articles.slice(8, 9).map(article => (
                <article key={article.id} className="mb-6">
                  <Link to={`/articles/${article.id}`} className="group">
                    <h3 className="font-serif text-xl mb-3 group-hover:text-gray-800">
                      {article.title}
                    </h3>
                    <p className="text-gray-600 font-serif">
                      {article.subtitle}
                    </p>
                  </Link>
                </article>
              ))}
            </div>

            {/* Center Column */}
            <div className="col-span-4">
              {articles.slice(9, 10).map(article => (
                <article key={article.id} className="mb-6">
                  <Link to={`/articles/${article.id}`} className="group">
                    <div className="aspect-video bg-gray-200 mb-4"></div>
                    <h3 className="font-serif text-xl mb-3 group-hover:text-gray-800">
                      {article.title}
                    </h3>
                    <p className="text-gray-600 font-serif">
                      {article.subtitle}
                    </p>
                  </Link>
                </article>
              ))}
            </div>

            {/* Right Column */}
            <div className="col-span-4">
              {articles.slice(10, 11).map(article => (
                <article key={article.id} className="mb-6">
                  <Link to={`/articles/${article.id}`} className="group">
                    <h3 className="font-serif text-xl mb-3 group-hover:text-gray-800">
                      {article.title}
                    </h3>
                    <p className="text-gray-600 font-serif">
                      {article.subtitle}
                    </p>
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
