import { Dialog, DialogContent } from "./ui/dialog";
import { Input } from "./ui/input";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Search } from "lucide-react";

interface SearchResult {
  title: string;
  path: string;
  category: string;
  excerpt: string;
}

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SearchModal = ({ isOpen, onClose }: SearchModalProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);

  // Mock search results - replace with actual search logic
  const handleSearch = (query: string) => {
    setSearchQuery(query);
    // Simulated search results
    const mockResults: SearchResult[] = [
      {
        title: "Understanding Learning Curves in Machine Learning",
        path: "/articles/learning-curves",
        category: "Machine Learning",
        excerpt: "A comprehensive guide to interpreting and optimizing model performance..."
      },
      {
        title: "Neural Network Architecture Trends 2024",
        path: "/articles/neural-networks-2024",
        category: "Deep Learning",
        excerpt: "Recent advancements in neural network architectures are reshaping..."
      },
      // Add more mock results
    ];
    
    setResults(mockResults.filter(result => 
      result.title.toLowerCase().includes(query.toLowerCase()) ||
      result.excerpt.toLowerCase().includes(query.toLowerCase())
    ));
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl">
        <div className="space-y-6 py-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-5 w-5" />
            <Input
              className="w-full pl-10 py-6 text-lg border-0 border-b border-gray-200 rounded-none focus:ring-0 font-serif"
              placeholder="Search articles..."
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              autoFocus
            />
          </div>

          <div className="space-y-8 max-h-[60vh] overflow-y-auto">
            {results.map((result) => (
              <div key={result.path} className="group">
                <Link 
                  to={result.path} 
                  className="block" 
                  onClick={onClose}
                >
                  <span className="text-xs uppercase tracking-wider text-gray-600">
                    {result.category}
                  </span>
                  <h3 className="font-serif text-xl mt-1 group-hover:underline">
                    {result.title}
                  </h3>
                  <p className="text-gray-600 mt-2 line-clamp-2">
                    {result.excerpt}
                  </p>
                </Link>
              </div>
            ))}

            {searchQuery && results.length === 0 && (
              <p className="text-center text-gray-500 py-8">
                No articles found matching "{searchQuery}"
              </p>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}; 