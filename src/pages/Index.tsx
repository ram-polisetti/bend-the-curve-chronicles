
import { NewsHeader } from "@/components/NewsHeader";
import { LearningCurve } from "@/components/LearningCurve";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="min-h-screen bg-newspaper-background">
      <div className="container mx-auto px-4">
        <NewsHeader />
        
        <main className="grid grid-cols-1 lg:grid-cols-12 gap-6 py-8">
          {/* Lead Story */}
          <article className="lg:col-span-8 space-y-6 animate-fade-in">
            <Card className="p-6 bg-white border-newspaper-border">
              <span className="text-xs text-newspaper-muted uppercase tracking-wider">Featured Story</span>
              <h2 className="font-serif text-3xl text-newspaper-primary mt-2 mb-4">Understanding Learning Curves in Machine Learning</h2>
              <div className="prose prose-newspaper max-w-none">
                <p className="text-newspaper-secondary leading-relaxed line-clamp-3">
                  In the realm of machine learning, understanding how your model learns over time is crucial. 
                  Learning curves provide invaluable insights into your model's performance and help identify 
                  potential issues such as overfitting or underfitting.
                </p>
                <LearningCurve />
                <div className="mt-4">
                  <Link to="/articles/learning-curves">
                    <Button variant="outline" className="text-newspaper-primary hover:bg-newspaper-background">
                      Read Full Story
                    </Button>
                  </Link>
                </div>
              </div>
            </Card>

            {/* Secondary Stories Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="p-6 bg-white border-newspaper-border">
                <span className="text-xs text-newspaper-muted uppercase tracking-wider">Deep Learning</span>
                <h3 className="font-serif text-xl text-newspaper-primary mt-2 mb-2">Neural Network Architecture Trends 2024</h3>
                <p className="text-newspaper-secondary text-sm line-clamp-3 mb-4">
                  Recent advancements in neural network architectures are reshaping how we approach deep learning problems.
                  From transformers to mixture of experts, explore the latest trends.
                </p>
                <Link to="/articles/neural-networks-2024">
                  <Button variant="link" className="text-newspaper-primary p-0">Continue Reading →</Button>
                </Link>
              </Card>

              <Card className="p-6 bg-white border-newspaper-border">
                <span className="text-xs text-newspaper-muted uppercase tracking-wider">Feature Engineering</span>
                <h3 className="font-serif text-xl text-newspaper-primary mt-2 mb-2">The Art of Feature Selection</h3>
                <p className="text-newspaper-secondary text-sm line-clamp-3 mb-4">
                  Discover how proper feature selection can dramatically improve your model's performance
                  while reducing computational overhead.
                </p>
                <Link to="/articles/feature-selection">
                  <Button variant="link" className="text-newspaper-primary p-0">Continue Reading →</Button>
                </Link>
              </Card>
            </div>
          </article>

          {/* Sidebar Content */}
          <aside className="lg:col-span-4 space-y-6 animate-slide-in">
            {/* Latest Updates Section */}
            <Card className="p-6 bg-white border-newspaper-border">
              <h3 className="font-serif text-xl text-newspaper-primary mb-4">Latest Updates</h3>
              <div className="space-y-4">
                <div>
                  <span className="text-xs text-newspaper-muted">10:30 AM</span>
                  <h4 className="text-newspaper-primary font-medium mt-1">New Benchmark Results Released</h4>
                  <p className="text-sm text-newspaper-secondary line-clamp-2">Latest ML models show promising results on complex tasks.</p>
                </div>
                <Separator className="bg-newspaper-border" />
                <div>
                  <span className="text-xs text-newspaper-muted">9:15 AM</span>
                  <h4 className="text-newspaper-primary font-medium mt-1">Conference Registration Open</h4>
                  <p className="text-sm text-newspaper-secondary line-clamp-2">ML Summit 2024 registration now available.</p>
                </div>
              </div>
            </Card>

            {/* Quick Links */}
            <Card className="p-6 bg-white border-newspaper-border">
              <h3 className="font-serif text-xl text-newspaper-primary mb-4">Popular Topics</h3>
              <ul className="space-y-4">
                <li>
                  <Link to="/topics/machine-learning" className="block hover:bg-newspaper-background p-3 rounded-lg transition-colors">
                    <span className="text-sm text-newspaper-muted">Machine Learning</span>
                    <h4 className="text-newspaper-primary font-medium mt-1">Introduction to ML</h4>
                  </Link>
                </li>
                <Separator className="bg-newspaper-border" />
                <li>
                  <Link to="/topics/deep-learning" className="block hover:bg-newspaper-background p-3 rounded-lg transition-colors">
                    <span className="text-sm text-newspaper-muted">Deep Learning</span>
                    <h4 className="text-newspaper-primary font-medium mt-1">Neural Networks Guide</h4>
                  </Link>
                </li>
                <Separator className="bg-newspaper-border" />
                <li>
                  <Link to="/topics/algorithms" className="block hover:bg-newspaper-background p-3 rounded-lg transition-colors">
                    <span className="text-sm text-newspaper-muted">Algorithms</span>
                    <h4 className="text-newspaper-primary font-medium mt-1">Optimization Methods</h4>
                  </Link>
                </li>
              </ul>
            </Card>
          </aside>
        </main>
      </div>
    </div>
  );
};

export default Index;
