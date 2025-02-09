import { NewsHeader } from "@/components/NewsHeader";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Index = () => {
  console.log("Index component rendering");

  return (
    <div className="min-h-screen bg-newspaper-background">
      <div className="container mx-auto px-4">
        <NewsHeader />
        <main className="py-8">
          <Card className="p-8 bg-white border-newspaper-border">
            <span className="text-xs text-newspaper-muted uppercase tracking-wider">Featured Story</span>
            <h2 className="font-serif text-4xl text-newspaper-primary mt-2 mb-4">
              Understanding Learning Curves in Machine Learning
            </h2>
            <p className="text-newspaper-secondary leading-relaxed line-clamp-3 mb-6">
              In the realm of machine learning, understanding how your model learns over time is crucial.
              Learning curves provide invaluable insights into your model's performance and help identify
              potential issues such as overfitting or underfitting.
            </p>
            <Link to="/articles/learning-curves">
              <Button variant="outline" className="text-newspaper-primary hover:bg-newspaper-background">
                Read Full Story
              </Button>
            </Link>
          </Card>
        </main>
      </div>
    </div>
  );
};

export default Index;
