
import { Separator } from "./ui/separator";
import { Input } from "./ui/input";
import { Search } from "lucide-react";

export const NewsHeader = () => {
  return (
    <header className="py-8 px-4 animate-fade-in">
      <div className="text-center mb-6">
        <h1 className="font-serif text-4xl md:text-6xl text-newspaper-primary tracking-tight">
          BEND THE CURVE
        </h1>
        <p className="font-serif text-newspaper-secondary mt-2 text-sm">
          VOL. 1 NO. 1 | {new Date().toLocaleDateString('en-US', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          })}
        </p>
      </div>
      
      {/* Search Bar */}
      <div className="max-w-md mx-auto mb-4">
        <div className="relative">
          <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-newspaper-muted h-4 w-4" />
          <Input 
            type="search"
            placeholder="Search articles..."
            className="pl-8 bg-white border-newspaper-border text-newspaper-primary"
          />
        </div>
      </div>

      <Separator className="bg-newspaper-border" />
      <nav className="flex justify-center gap-6 mt-4 text-newspaper-secondary text-sm">
        <a href="#" className="hover:text-newspaper-primary transition-colors">Latest</a>
        <a href="#" className="hover:text-newspaper-primary transition-colors">Machine Learning</a>
        <a href="#" className="hover:text-newspaper-primary transition-colors">Tutorials</a>
        <a href="#" className="hover:text-newspaper-primary transition-colors">Research</a>
      </nav>
    </header>
  );
};
