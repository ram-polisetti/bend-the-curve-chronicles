
import { Link } from "react-router-dom";
import { SearchBar } from "./SearchBar";
import { Button } from "./ui/button";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import type { User } from '@supabase/supabase-js';

interface NewsHeaderProps {
  isArticlePage?: boolean;
}

export const NewsHeader = ({ isArticlePage }: NewsHeaderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (!error) {
      navigate('/auth');
    }
  };

  return (
    <header className="py-4">
      <div className="container mx-auto px-4">
        <div className="max-w-[2000px] mx-auto pl-0">
          <div className="flex justify-between items-center mb-4">
            <Link to="/" className="font-serif text-4xl text-black">
              BendTheCurve.today
            </Link>
            <div className="flex items-center gap-4">
              <SearchBar />
              {user && (
                <Link to="/create-article">
                  <Button variant="ghost">Write Article</Button>
                </Link>
              )}
              {user ? (
                <Button onClick={handleSignOut} variant="ghost">
                  Sign Out
                </Button>
              ) : (
                <Link to="/auth">
                  <Button variant="ghost">Sign In</Button>
                </Link>
              )}
            </div>
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
