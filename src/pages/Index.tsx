
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
      <div className="border-b border-black">
        <div className="container mx-auto px-4 py-4">
          <h1 className="text-5xl font-serif text-center border-b-2 border-black pb-4 mb-2">
            BEND THE CURVE
          </h1>
          <div className="text-center text-sm mb-2">
            VOL. 127 - NO. 39 • DAILY TECH NEWS AND INSIGHTS • {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
          </div>
        </div>
      </div>
      <NewsHeader />
      <main className="container mx-auto px-4 py-8">
        {/* Main Headline Section */}
        {articles.length > 0 && (
          <div className="border-b-2 border-black pb-8 mb-8">
            <div className="grid grid-cols-12 gap-8">
              <div className="col-span-8">
                <Link to={`/articles/${articles[0].id}`}>
                  <h2 className="font-serif text-6xl mb-4 leading-tight">
                    {articles[0].title}
                  </h2>
                  <p className="text-lg font-serif italic mb-4">
                    {articles[0].subtitle}
                  </p>
                </Link>
              </div>
              <div className="col-span-4">
                <div className="aspect-[4/3] bg-gray-200 w-full"></div>
              </div>
            </div>
          </div>
        )}

        {/* Three Column Layout */}
        <div className="grid grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="border-r border-gray-300 pr-8">
            <div className="bg-gray-100 p-4 mb-6">
              <h3 className="font-serif text-xl mb-2 uppercase">Important Information</h3>
              <p className="text-sm">
                {articles[1]?.subtitle || "Latest updates and breaking news in AI and technology."}
              </p>
            </div>
            {articles.slice(1, 3).map(article => (
              <article key={article.id} className="mb-6 pb-6 border-b border-gray-300">
                <Link to={`/articles/${article.id}`}>
                  <h3 className="font-serif text-xl mb-2">{article.title}</h3>
                  <p className="text-sm text-gray-700">{article.subtitle}</p>
                </Link>
              </article>
            ))}
          </div>

          {/* Middle Column */}
          <div className="px-8">
            <div className="text-center mb-6 pb-6 border-b-2 border-black">
              <h3 className="font-serif text-2xl uppercase mb-2">Extra! Extra!</h3>
              <p className="text-sm">
                Breaking developments in artificial intelligence and machine learning
              </p>
            </div>
            {articles.slice(3, 5).map(article => (
              <article key={article.id} className="mb-6 pb-6 border-b border-gray-300">
                <Link to={`/articles/${article.id}`}>
                  <h3 className="font-serif text-xl mb-2">{article.title}</h3>
                  <p className="text-sm text-gray-700">{article.subtitle}</p>
                </Link>
              </article>
            ))}
          </div>

          {/* Right Column */}
          <div className="border-l border-gray-300 pl-8">
            <div className="bg-gray-900 text-white p-4 mb-6">
              <h3 className="font-serif text-xl mb-2">Today's Highlights</h3>
              <div className="text-4xl font-serif text-center my-4">
                {new Date().getDate()}
              </div>
              <p className="text-sm uppercase text-center">
                {new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
              </p>
            </div>
            {articles.slice(5, 7).map(article => (
              <article key={article.id} className="mb-6 pb-6 border-b border-gray-300">
                <Link to={`/articles/${article.id}`}>
                  <h3 className="font-serif text-xl mb-2">{article.title}</h3>
                  <p className="text-sm text-gray-700">{article.subtitle}</p>
                </Link>
              </article>
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
