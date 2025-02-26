
import { Link } from "react-router-dom";
import { Article } from "@/types/article";
import { ArticleSkeleton } from "@/components/ui/article-skeleton";

interface TopArticlesGridProps {
  articles: Article[];
  isLoading?: boolean;
}

export const TopArticlesGrid = ({ articles, isLoading }: TopArticlesGridProps) => {
  if (isLoading) {
    return (
      <div className="col-span-2 grid grid-cols-2 gap-6">
        {Array(3).fill(null).map((_, i) => (
          <div key={i} className="border-b border-gray-200 pb-6">
            <ArticleSkeleton />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="col-span-2 grid grid-cols-2 gap-6">
      {articles.map((article) => (
        <article key={article.id} className="border-b border-gray-200 pb-6">
          <Link to={`/articles/${article.id}`} className="group">
            {article.hero_image && (
              <img 
                src={article.hero_image} 
                alt={article.title}
                className="w-full h-[200px] object-cover rounded-lg mb-4"
              />
            )}
            <h2 className={`font-serif text-2xl mb-3 group-hover:text-gray-800 ${!article.hero_image ? 'mt-0' : ''}`}>
              {article.title}
            </h2>
            <p className="text-gray-600 mb-4 line-clamp-4">
              {article.content}
            </p>
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
  );
};
