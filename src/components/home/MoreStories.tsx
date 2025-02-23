
import { Link } from "react-router-dom";

interface Article {
  id: string;
  title: string;
  read_time: string;
  hero_image: string | null;
  views: number;
}

interface MoreStoriesProps {
  articles: Article[];
}

export const MoreStories = ({ articles }: MoreStoriesProps) => {
  if (!articles.length) return null;

  return (
    <div className="mt-12 border-t border-black pt-8">
      <h2 className="font-serif text-2xl mb-6">More Stories</h2>
      <div className="grid grid-cols-4 gap-6">
        {articles.map((article) => (
          <article key={article.id}>
            <Link to={`/articles/${article.id}`} className="group">
              {article.hero_image && (
                <img 
                  src={article.hero_image} 
                  alt={article.title}
                  className="w-full h-[150px] object-cover rounded-lg mb-4"
                />
              )}
              <h3 className={`font-serif text-xl group-hover:text-gray-800 ${!article.hero_image ? 'mt-0' : ''}`}>
                {article.title}
              </h3>
              <div className="flex items-center justify-between mt-2">
                <span className="text-sm text-gray-500">
                  {article.read_time}
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
