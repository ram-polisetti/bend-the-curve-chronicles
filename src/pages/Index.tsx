
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
        {/* Featured Article */}
        {articles.length > 0 && (
          <div className="mb-16 border-b border-black pb-12">
            <Link to={`/articles/${articles[0].id}`} className="group">
              <span className="text-xs uppercase tracking-wider text-gray-600">
                {articles[0].category}
              </span>
              <h2 className="font-serif text-5xl mt-4 mb-4 group-hover:text-gray-800">
                {articles[0].title}
              </h2>
              {articles[0].subtitle && (
                <p className="text-xl mt-3 text-gray-600 font-serif">
                  {articles[0].subtitle}
                </p>
              )}
              <div className="text-sm text-gray-600 mt-4">
                {articles[0].read_time} • By {articles[0].author}
              </div>
            </Link>
          </div>
        )}

        {/* Articles Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {articles.slice(1).map((article, index) => (
            <article key={article.id} className={`border-b border-gray-200 pb-8 ${
              index % 2 === 0 ? 'lg:border-r lg:pr-12' : 'lg:pl-12'
            }`}>
              <Link to={`/articles/${article.id}`} className="group">
                <span className="text-xs uppercase tracking-wider text-gray-600">
                  {article.category}
                </span>
                <h3 className="font-serif text-2xl mt-2 mb-3 group-hover:text-gray-800">
                  {article.title}
                </h3>
                {article.subtitle && (
                  <p className="text-base text-gray-600 font-serif">
                    {article.subtitle}
                  </p>
                )}
                <div className="text-sm text-gray-600 mt-3">
                  {article.read_time} • By {article.author}
                </div>
              </Link>
            </article>
          ))}
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
