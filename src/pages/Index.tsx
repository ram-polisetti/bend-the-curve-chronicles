
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

  const todayDate = new Date();
  const formattedDate = todayDate.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <div className="min-h-screen bg-white">
      {/* Top Header Section */}
      <div className="border-b border-black">
        <div className="container mx-auto px-4 py-4">
          <h1 className="text-6xl font-serif text-center font-bold tracking-tight mb-4">
            BEND THE CURVE
          </h1>
          <div className="text-center text-sm border-t border-b border-black py-2">
            {formattedDate.toUpperCase()} • DAILY TECH NEWS AND INSIGHTS
          </div>
        </div>
      </div>

      <main className="container mx-auto px-4 py-8">
        {/* Featured Article */}
        {articles.length > 0 && (
          <Link to={`/articles/${articles[0].id}`} className="block group">
            <div className="border-b-2 border-black pb-8 mb-12">
              <h2 className="font-serif text-5xl font-bold mb-4 text-center group-hover:text-gray-700 transition-colors">
                {articles[0].title}
              </h2>
              <p className="text-xl text-center font-serif mb-6 text-gray-700">
                {articles[0].subtitle}
              </p>
              <div className="max-w-3xl mx-auto text-lg font-serif leading-relaxed">
                {articles[0].content?.slice(0, 300)}...
                <span className="text-gray-500 hover:text-black ml-2">Read More →</span>
              </div>
            </div>
          </Link>
        )}

        {/* Two Column Layout for Secondary Articles */}
        <div className="grid grid-cols-2 gap-12">
          {/* Left Column */}
          <div className="space-y-12">
            {articles.slice(1, 4).map((article) => (
              <Link key={article.id} to={`/articles/${article.id}`} className="block group">
                <article className="border-b border-gray-200 pb-8">
                  <h3 className="font-serif text-3xl mb-3 group-hover:text-gray-700 transition-colors">
                    {article.title}
                  </h3>
                  <p className="text-gray-700 mb-4 font-serif">{article.subtitle}</p>
                  <div className="text-sm text-gray-600 mb-4">
                    By {article.author} • {new Date(article.created_at).toLocaleDateString()}
                  </div>
                  <p className="font-serif text-base">
                    {article.content?.slice(0, 200)}...
                    <span className="text-gray-500 hover:text-black ml-2">Read More →</span>
                  </p>
                </article>
              </Link>
            ))}
          </div>

          {/* Right Column */}
          <div className="space-y-12">
            {articles.slice(4, 7).map((article) => (
              <Link key={article.id} to={`/articles/${article.id}`} className="block group">
                <article className="border-b border-gray-200 pb-8">
                  <h3 className="font-serif text-3xl mb-3 group-hover:text-gray-700 transition-colors">
                    {article.title}
                  </h3>
                  <p className="text-gray-700 mb-4 font-serif">{article.subtitle}</p>
                  <div className="text-sm text-gray-600 mb-4">
                    By {article.author} • {new Date(article.created_at).toLocaleDateString()}
                  </div>
                  <p className="font-serif text-base">
                    {article.content?.slice(0, 200)}...
                    <span className="text-gray-500 hover:text-black ml-2">Read More →</span>
                  </p>
                </article>
              </Link>
            ))}
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
