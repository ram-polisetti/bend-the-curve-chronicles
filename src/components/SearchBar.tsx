import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search } from "lucide-react";

const articles = [
  {
    title: "Understanding Learning Curves in Machine Learning",
    path: "/articles/learning-curves",
    category: "Machine Learning"
  },
  {
    title: "Neural Network Architecture Trends 2024",
    path: "/articles/neural-networks-2024",
    category: "Deep Learning"
  },
  {
    title: "The Future of AutoML",
    path: "/articles/automl-future",
    category: "AutoML"
  },
  {
    title: "The Rise of Ethical AI",
    path: "/articles/ethical-ai",
    category: "Ethics"
  }
];

export const SearchBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const filteredArticles = articles.filter(article =>
    article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    article.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSearch = (article: typeof articles[0]) => {
    navigate(article.path);
    setSearchQuery("");
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <div className="flex items-center border-b border-gray-200">
        <Search className="h-4 w-4 text-gray-400" />
        <input
          type="text"
          placeholder="Search articles..."
          className="w-64 px-3 py-2 text-sm focus:outline-none"
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
        />
      </div>

      {/* Search Results Dropdown */}
      {isOpen && searchQuery && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 shadow-lg rounded-md z-50">
          {filteredArticles.length > 0 ? (
            <ul className="py-2">
              {filteredArticles.map((article) => (
                <li key={article.path}>
                  <button
                    className="w-full px-4 py-2 text-left hover:bg-gray-50 text-sm"
                    onClick={() => handleSearch(article)}
                  >
                    <span className="block text-black">{article.title}</span>
                    <span className="text-xs text-gray-500">{article.category}</span>
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <div className="px-4 py-2 text-sm text-gray-500">
              No articles found
            </div>
          )}
        </div>
      )}
    </div>
  );
};