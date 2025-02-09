import { Link } from "react-router-dom";
import { SearchBar } from "./SearchBar";

interface NewsHeaderProps {
  isArticlePage?: boolean;
}

export const NewsHeader = ({ isArticlePage }: NewsHeaderProps) => {
  return (
    <header className="py-4">
      <div className="container mx-auto px-4">
        <div className="max-w-[2000px] mx-auto pl-0">
          <div className="flex justify-between items-center mb-4">
            <Link to="/" className="font-serif text-4xl text-black">
              ML Chronicle
            </Link>
            <SearchBar />
          </div>
          <nav className="flex space-x-6 text-sm pl-0">
            <Link to="/topics/machine-learning" className="hover:text-gray-600">Machine Learning</Link>
            <Link to="/topics/deep-learning" className="hover:text-gray-600">Deep Learning</Link>
            <Link to="/topics/reinforcement-learning" className="hover:text-gray-600">Reinforcement Learning</Link>
            <Link to="/topics/ethics" className="hover:text-gray-600">Ethics in AI</Link>
            <Link to="/topics/research" className="hover:text-gray-600">Research</Link>
          </nav>
          <div className="mt-4 border-b border-black max-w-[2000px] mx-auto" />
        </div>
      </div>
    </header>
  );
};
