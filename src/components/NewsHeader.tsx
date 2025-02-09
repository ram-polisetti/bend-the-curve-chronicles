import { Link } from "react-router-dom";
import { Search } from "lucide-react";
import { Button } from "./ui/button";
import { useState } from "react";
import { SearchModal } from "./SearchModal";

interface NewsHeaderProps {
  isArticlePage?: boolean;
}

export const NewsHeader = ({ isArticlePage = false }: NewsHeaderProps) => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <>
      <header className={`py-4 border-b-2 border-black bg-white ${isArticlePage ? 'sticky top-0 z-50' : ''}`}>
        <div className="container mx-auto px-4">
          {isArticlePage ? (
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-8">
                <Link to="/" className="font-serif text-3xl text-black hover:text-gray-800">
                  THE ML CHRONICLE
                </Link>
                <span className="text-xs uppercase tracking-wider text-gray-600">
                  Vol. 1, No. 1
                </span>
              </div>
              <div className="flex items-center space-x-8">
                <nav className="flex items-center space-x-8 text-sm font-serif uppercase tracking-wider">
                  <Link to="/" className="hover:underline">Front Page</Link>
                  <span>|</span>
                  <Link to="/topics" className="hover:underline">Topics</Link>
                  <span>|</span>
                  <Link to="/archive" className="hover:underline">Archive</Link>
                  <span>|</span>
                  <Link to="/about" className="hover:underline">About</Link>
                </nav>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsSearchOpen(true)}
                  className="hover:bg-gray-100"
                >
                  <Search className="h-5 w-5" />
                </Button>
              </div>
            </div>
          ) : (
            // Original large header for homepage
            <div className="text-center space-y-4">
              <h1 className="font-serif text-7xl text-black border-b-4 border-black pb-4 mb-4">
                THE ML CHRONICLE
              </h1>
              <div className="flex justify-between items-center text-xs uppercase tracking-widest border-y border-black py-2">
                <span>Vol. 1, No. 1</span>
                <p>Illuminating the Path of Machine Learning Since 2024</p>
                <span>March 16, 2024</span>
              </div>
              <nav className="flex justify-center space-x-8 pt-4 text-sm font-serif uppercase tracking-wider">
                <Link to="/" className="hover:underline">Front Page</Link>
                <span>|</span>
                <Link to="/topics" className="hover:underline">Topics</Link>
                <span>|</span>
                <Link to="/archive" className="hover:underline">Archive</Link>
                <span>|</span>
                <Link to="/about" className="hover:underline">About</Link>
              </nav>
            </div>
          )}
        </div>
      </header>

      <SearchModal 
        isOpen={isSearchOpen} 
        onClose={() => setIsSearchOpen(false)} 
      />
    </>
  );
};
