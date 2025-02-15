
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
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

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
  }, [selectedCategory]);

  const fetchArticles = async () => {
    console.log('Fetching articles for category:', selectedCategory);
    let query = supabase
      .from('articles')
      .select('*')
      .order('created_at', { ascending: false });

    if (selectedCategory !== 'all') {
      query = query.eq('category', selectedCategory);
    }

    const { data, error } = await query;

    if (error) {
      console.error('Error fetching articles:', error);
      return;
    }

    console.log('Fetched articles:', data);

    // Process articles to determine difficulty levels
    const processedArticles = (data || []).map(article => ({
      ...article,
      difficulty_level: article.category === 'deep-learning' || article.category === 'reinforcement-learning' ? 2 : 1,
      prerequisites: []
    }));

    setArticles(processedArticles);
  };

  const categories = [
    { id: 'machine-learning', label: 'Machine Learning' },
    { id: 'deep-learning', label: 'Deep Learning' },
    { id: 'reinforcement-learning', label: 'Reinforcement Learning' },
    { id: 'ethics', label: 'Ethics in AI' },
    { id: 'research', label: 'Research' }
  ];

  return (
    <div className="min-h-screen bg-white">
      <NewsHeader />
      <div className="container mx-auto px-4">
        <div className="max-w-[2000px] mx-auto py-8">
          {/* Category Navigation */}
          <nav className="border-b border-black mb-8">
            <div className="flex space-x-8 overflow-x-auto py-4">
              <button
                onClick={() => setSelectedCategory('all')}
                className={`text-lg whitespace-nowrap ${
                  selectedCategory === 'all' ? 'font-bold' : ''
                }`}
              >
                All
              </button>
              {categories.map(category => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`text-lg whitespace-nowrap ${
                    selectedCategory === category.id ? 'font-bold' : ''
                  }`}
                >
                  {category.label}
                </button>
              ))}
            </div>
          </nav>

          {/* Main Content */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {articles.map(article => (
              <article key={article.id} className="border-b border-gray-200 pb-4">
                <Link to={`/articles/${article.id}`} className="group">
                  <span className="text-xs uppercase tracking-wider text-gray-600">
                    {article.category}
                  </span>
                  <h3 className="font-serif text-xl mt-2 group-hover:text-gray-800">
                    {article.title}
                  </h3>
                  {article.subtitle && (
                    <p className="text-sm mt-1 text-gray-600">
                      {article.subtitle}
                    </p>
                  )}
                  <div className="text-sm text-gray-600 mt-2">
                    {article.read_time} • By {article.author}
                  </div>
                </Link>
              </article>
            ))}
          </div>

          {articles.length === 0 && (
            <div className="text-center py-12 text-gray-500">
              No articles found for this category.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Index;
