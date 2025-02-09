
import { Separator } from "./ui/separator";

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
