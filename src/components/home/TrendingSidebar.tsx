
import { Link } from "react-router-dom";
import { Article } from "@/types/article";
import { ArticleSkeleton } from "@/components/ui/article-skeleton";

interface TrendingSidebarProps {
  articles: Article[];
  isLoading?: boolean;
}

export const TrendingSidebar = ({ articles, isLoading }: TrendingSidebarProps) => {
  if (isLoading) {
    return (
      <div className="border-l border-gray-200 pl-6">
        <h2 className="font-serif text-2xl mb-6 border-b border-black pb-2">
          Trending Now
        </h2>
        <div className="space-y-6">
          {Array(4).fill(null).map((_, i) => (
            <ArticleSkeleton key={i} />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="border-l border-gray-200 pl-6">
      <h2 className="font-serif text-2xl mb-6 border-b border-black pb-2">
        Trending Now
      </h2>
      <div className="space-y-6">
        {articles.map((article) => (
          <article key={article.id}>
            <Link to={`/articles/${article.id}`} className="group">
              <span className="text-xs uppercase tracking-wider text-gray-600">
                {article.category}
              </span>
              <h3 className="font-serif text-xl mt-1 group-hover:text-gray-800">
                {article.title}
              </h3>
              <div className="flex items-center justify-between mt-2">
                <span className="text-sm text-gray-500">
                  {new Date(article.created_at).toLocaleDateString()}
                </span>
                <span className="text-sm text-gray-500">
                  {article.views.toLocaleString()} views
                </span>
              </div>
            </Link>
          </article>
        ))}
      </div>
    </div>
  );
};
