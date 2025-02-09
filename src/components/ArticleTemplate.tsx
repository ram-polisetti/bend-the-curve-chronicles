
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { NewsHeader } from "@/components/NewsHeader";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowLeft, Clock, User } from "lucide-react";

interface ArticleTemplateProps {
  title: string;
  subtitle?: string;
  author: string;
  date: string;
  readTime: string;
  content: React.ReactNode;
  relatedArticles?: {
    title: string;
    path: string;
    category: string;
  }[];
}

export const ArticleTemplate = ({
  title,
  subtitle,
  author,
  date,
  readTime,
  content,
  relatedArticles,
}: ArticleTemplateProps) => {
  return (
    <div className="min-h-screen bg-newspaper-background">
      <div className="container mx-auto px-4">
        <NewsHeader />
        
        <main className="grid grid-cols-1 lg:grid-cols-12 gap-6 py-8">
          {/* Article Content - Left Side */}
          <article className="lg:col-span-8 space-y-6">
            <Link to="/">
              <Button variant="ghost" className="mb-4">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Home
              </Button>
            </Link>
            
            <Card className="p-8 bg-white border-newspaper-border">
              <div className="space-y-4">
                <h1 className="font-serif text-4xl md:text-5xl text-newspaper-primary">
                  {title}
                </h1>
                {subtitle && (
                  <p className="text-xl text-newspaper-secondary">{subtitle}</p>
                )}
                
                <div className="flex items-center gap-6 text-newspaper-muted text-sm">
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4" />
                    <span>{author}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    <span>{readTime}</span>
                  </div>
                  <span>{date}</span>
                </div>
                
                <Separator className="my-6" />
                
                <div className="prose prose-newspaper max-w-none">
                  {content}
                </div>
              </div>
            </Card>
          </article>
          
          {/* Sidebar - Right Side */}
          <aside className="lg:col-span-4 space-y-6">
            <Card className="p-6 bg-white border-newspaper-border">
              <h3 className="font-serif text-xl text-newspaper-primary mb-4">
                Related Articles
              </h3>
              <div className="space-y-4">
                {relatedArticles?.map((article, index) => (
                  <div key={index}>
                    <span className="text-xs text-newspaper-muted uppercase">
                      {article.category}
                    </span>
                    <Link 
                      to={article.path}
                      className="block hover:text-newspaper-primary transition-colors"
                    >
                      <h4 className="text-newspaper-secondary font-medium mt-1">
                        {article.title}
                      </h4>
                    </Link>
                    {index < (relatedArticles.length - 1) && (
                      <Separator className="my-4" />
                    )}
                  </div>
                ))}
              </div>
            </Card>
          </aside>
        </main>
      </div>
    </div>
  );
};
