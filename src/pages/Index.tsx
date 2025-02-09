
import { NewsHeader } from "@/components/NewsHeader";
import { LearningCurve } from "@/components/LearningCurve";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const Index = () => {
  return (
    <div className="min-h-screen bg-newspaper-background">
      <div className="container mx-auto px-4">
        <NewsHeader />
        
        <main className="grid grid-cols-1 md:grid-cols-12 gap-6 py-8">
          {/* Main Article */}
          <article className="md:col-span-8 space-y-6 animate-fade-in">
            <Card className="p-6 bg-white border-newspaper-border">
              <span className="text-xs text-newspaper-muted uppercase tracking-wider">Featured Article</span>
              <h2 className="font-serif text-3xl text-newspaper-primary mt-2 mb-4">Understanding Learning Curves in Machine Learning</h2>
              <div className="prose prose-newspaper max-w-none">
                <p className="text-newspaper-secondary leading-relaxed">
                  In the realm of machine learning, understanding how your model learns over time is crucial. 
                  Learning curves provide invaluable insights into your model's performance and help identify 
                  potential issues such as overfitting or underfitting.
                </p>
                <LearningCurve />
                <p className="text-newspaper-secondary leading-relaxed mt-6">
                  The graph above illustrates a typical learning curve where the training error (blue) decreases 
                  steadily while the validation error (green) converges to a higher value. This gap between 
                  training and validation performance is indicative of the model's generalization capability.
                </p>
              </div>
            </Card>
          </article>

          {/* Sidebar */}
          <aside className="md:col-span-4 space-y-6 animate-slide-in">
            <Card className="p-6 bg-white border-newspaper-border">
              <h3 className="font-serif text-xl text-newspaper-primary mb-4">Related Topics</h3>
              <ul className="space-y-4">
                <li>
                  <a href="#" className="block hover:bg-newspaper-background p-3 rounded-lg transition-colors">
                    <span className="text-sm text-newspaper-muted">Machine Learning</span>
                    <h4 className="text-newspaper-primary font-medium mt-1">Hyperparameter Tuning Techniques</h4>
                  </a>
                </li>
                <Separator className="bg-newspaper-border" />
                <li>
                  <a href="#" className="block hover:bg-newspaper-background p-3 rounded-lg transition-colors">
                    <span className="text-sm text-newspaper-muted">Deep Learning</span>
                    <h4 className="text-newspaper-primary font-medium mt-1">Neural Network Architectures</h4>
                  </a>
                </li>
                <Separator className="bg-newspaper-border" />
                <li>
                  <a href="#" className="block hover:bg-newspaper-background p-3 rounded-lg transition-colors">
                    <span className="text-sm text-newspaper-muted">Data Science</span>
                    <h4 className="text-newspaper-primary font-medium mt-1">Feature Engineering Best Practices</h4>
                  </a>
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
