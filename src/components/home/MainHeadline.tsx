
import { Link } from "react-router-dom";
import { Article } from "@/types/article";
import { ArticleSkeleton } from "@/components/ui/article-skeleton";

interface MainHeadlineProps {
  article?: Article;
  isLoading?: boolean;
}

export const MainHeadline = ({ article, isLoading }: MainHeadlineProps) => {
  if (isLoading) {
    return (
      <div className="border-b-2 border-black py-6">
        <ArticleSkeleton />
      </div>
    );
  }

  if (!article) return null;

  return (
    <div className="border-b-2 border-black py-6">
      <span className="text-xs font-bold uppercase tracking-wider">Most Popular</span>
      <Link to={`/articles/${article.id}`} className="group">
        {article.hero_image && (
          <img 
            src={article.hero_image} 
            alt={article.title}
            className="w-full h-[500px] object-cover rounded-lg mb-4"
          />
        )}
        <h1 className={`font-serif text-7xl text-black mt-2 mb-6 leading-none group-hover:text-gray-800 ${!article.hero_image ? 'mt-4' : ''}`}>
          {article.title}
        </h1>
        {article.subtitle && (
          <div className="text-xl font-serif leading-relaxed group-hover:text-gray-700">
            {article.subtitle}
          </div>
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
    </div>
  );
};
