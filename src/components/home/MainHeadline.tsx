
import { Link } from "react-router-dom";

interface Article {
  id: string;
  title: string;
  subtitle: string | null;
  hero_image: string | null;
  views: number;
}

interface MainHeadlineProps {
  article: Article;
}

export const MainHeadline = ({ article }: MainHeadlineProps) => {
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
