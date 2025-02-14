
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

interface ArticleRelationship {
  target_article_id: string;
  relationship_type: string;
}

interface ArticleWithRelationships extends Article {
  article_relationships: ArticleRelationship[];
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
    let query = supabase
      .from('articles')
      .select(`
        *,
        article_relationships (
          target_article_id,
          relationship_type
        )
      `)
      .order('created_at', { ascending: false });

    if (selectedCategory !== 'all') {
      query = query.eq('category', selectedCategory);
    }

    const { data, error } = await query;

    if (error) {
      console.error('Error fetching articles:', error);
      return;
    }

    // Process articles to determine difficulty levels and prerequisites
    const processedArticles = (data as ArticleWithRelationships[]).map(article => {
      const prerequisites = article.article_relationships
        ?.filter(rel => rel.relationship_type === 'prerequisite')
        ?.map(rel => rel.target_article_id) || [];

      // Calculate difficulty level based on prerequisites count and category
      let difficultyLevel = 1;
      if (prerequisites.length > 0) {
        difficultyLevel += prerequisites.length;
      }
      if (article.category === 'deep-learning' || article.category === 'reinforcement-learning') {
        difficultyLevel += 1;
      }

      return {
        ...article,
        difficulty_level: difficultyLevel,
        prerequisites
      };
    });

    // Sort articles by difficulty level and creation date
    const sortedArticles = processedArticles.sort((a, b) => {
      if (a.difficulty_level === b.difficulty_level) {
        return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
      }
      return a.difficulty_level - b.difficulty_level;
    });

    setArticles(sortedArticles);
  };

  const renderArticlesByLevel = () => {
    const articlesByLevel = articles.reduce((acc, article) => {
      const level = article.difficulty_level;
      if (!acc[level]) {
        acc[level] = [];
      }
      acc[level].push(article);
      return acc;
    }, {} as Record<number, ArticleWithDifficulty[]>);

    return Object.entries(articlesByLevel).map(([level, levelArticles]) => (
      <div key={level} className="mb-12">
        <h2 className="font-serif text-2xl mb-6 border-b border-black pb-2">
          {level === '1' ? 'Getting Started' : 
           level === '2' ? 'Intermediate Concepts' : 
           'Advanced Topics'}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {levelArticles.map(article => (
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
                {article.prerequisites.length > 0 && (
                  <div className="mt-2 text-sm text-blue-600">
                    Recommended prerequisites: {article.prerequisites.length}
                  </div>
                )}
              </Link>
            </article>
          ))}
        </div>
      </div>
    ));
  };

  return (
    <div className="min-h-screen bg-white">
      <NewsHeader />
      <div className="container mx-auto px-4">
        <div className="max-w-[2000px] mx-auto py-8">
          <div className="mb-8">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="p-2 border rounded"
            >
              <option value="all">All Categories</option>
              <option value="general">General</option>
              <option value="machine-learning">Machine Learning</option>
              <option value="deep-learning">Deep Learning</option>
              <option value="reinforcement-learning">Reinforcement Learning</option>
              <option value="ethics">Ethics in AI</option>
              <option value="research">Research</option>
            </select>
          </div>

          {/* Main Headline - keep only the most recent beginner-friendly article */}
          {articles.length > 0 && articles[0].difficulty_level === 1 && (
            <div className="border-b-2 border-black py-6 mb-12">
              <span className="text-xs font-bold uppercase tracking-wider">Featured Article</span>
              <Link to={`/articles/${articles[0].id}`} className="group">
                <h1 className="font-serif text-7xl text-black mt-2 mb-6 leading-none group-hover:text-gray-800">
                  {articles[0].title}
                </h1>
                <div className="text-xl font-serif leading-relaxed group-hover:text-gray-700">
                  {articles[0].subtitle}
                </div>
                <span className="text-sm text-black group-hover:underline mt-2 inline-block">
                  Continue Reading →
                </span>
              </Link>
            </div>
          )}

          {/* Articles organized by difficulty level */}
          {renderArticlesByLevel()}
        </div>
      </div>
    </div>
  );
};

export default Index;
