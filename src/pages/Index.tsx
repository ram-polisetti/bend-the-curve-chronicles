
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
        <div className="container mx-auto px-4 py-2">
          <div className="flex justify-between text-xs uppercase mb-2">
            <span>Latest Daily AI Growing News</span>
            <span>Latest News: Life Breaking Tech - Page 14 • Today Deal</span>
          </div>
          <h1 className="text-6xl font-serif text-center font-bold tracking-tight mb-2">
            BEND THE CURVE
          </h1>
          <div className="text-center text-xs border-t border-b border-black py-1 mb-4">
            VOL. 127 - NO. 39 • {formattedDate.toUpperCase()} • XX PAGES IN X SECTIONS • PRICE XX CENTS
          </div>
        </div>
      </div>

      <main className="container mx-auto px-4 py-6">
        {/* Main Headline */}
        {articles.length > 0 && (
          <div className="mb-8">
            <h2 className="font-serif text-6xl font-bold mb-4 text-center leading-tight">
              {articles[0].title.toUpperCase()}
            </h2>
            <p className="text-lg text-center font-serif mb-6">
              {articles[0].subtitle}
            </p>
          </div>
        )}

        {/* Three Column Layout */}
        <div className="grid grid-cols-12 gap-8">
          {/* Left Column */}
          <div className="col-span-3">
            <div className="bg-black text-white p-4 mb-6">
              <h3 className="font-serif text-xl mb-2">IMPORTANT INFORMATION</h3>
              <div className="text-sm">
                {articles[1]?.content?.slice(0, 200)}...
              </div>
            </div>
            <article className="mb-6">
              <h4 className="font-serif text-2xl mb-2">OLD PAPER</h4>
              <h5 className="text-lg mb-2">• Retro News •</h5>
              <p className="text-sm">
                {articles[2]?.content?.slice(0, 300)}...
              </p>
            </article>
          </div>

          {/* Middle Column - Extra Extra */}
          <div className="col-span-6 border-l border-r border-black px-8">
            <div className="text-center mb-6">
              <h3 className="font-serif text-3xl font-bold mb-2">EXTRA! EXTRA!</h3>
              {articles[3] && (
                <>
                  <p className="text-lg mb-4">{articles[3].subtitle}</p>
                  <div className="text-sm">
                    {articles[3].content?.slice(0, 400)}...
                  </div>
                </>
              )}
            </div>
            <div className="text-center mt-8">
              <h3 className="font-serif text-4xl font-bold mb-4">TOWN HALL MEETING TOMORROW</h3>
              {articles[4] && (
                <p className="text-sm">
                  {articles[4].content?.slice(0, 300)}...
                </p>
              )}
            </div>
          </div>

          {/* Right Column */}
          <div className="col-span-3">
            <div className="border border-black p-4 text-center mb-6">
              <h3 className="font-serif text-xl mb-2">SUNDAY</h3>
              <h4 className="font-serif text-5xl mb-2">OCTOBER</h4>
              <div className="text-6xl font-bold mb-2">{todayDate.getDate()}</div>
              <div className="text-xl">{todayDate.getFullYear()}</div>
            </div>
            {articles.slice(5, 7).map((article, index) => (
              <article key={article.id} className="mb-6 pb-4 border-b border-gray-300 last:border-b-0">
                <Link to={`/articles/${article.id}`}>
                  <h4 className="font-serif text-xl mb-2">{article.title}</h4>
                  <p className="text-sm">{article.content?.slice(0, 150)}...</p>
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
