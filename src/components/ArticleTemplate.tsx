
import { Link } from "react-router-dom";
import { NewsHeader } from "./NewsHeader";
import { useEffect, useRef, useState } from "react";

interface RelatedArticle {
  title: string;
  path: string;
  category: string;
}

interface NextInIssue {
  title: string;
  path: string;
  category: string;
  excerpt: string;
}

interface ArticleTemplateProps {
  title: string;
  subtitle: string;
  author: string;
  date: string;
  readTime: string;
  content: React.ReactNode;
  inspiration: string;
  relatedArticles: RelatedArticle[];
  nextInIssue: NextInIssue[];
  heroImage?: string;
}

export const ArticleTemplate = ({
  title,
  subtitle,
  author,
  date,
  readTime,
  content,
  inspiration,
  relatedArticles,
  nextInIssue,
  heroImage,
}: ArticleTemplateProps) => {
  const [activeSection, setActiveSection] = useState<string>("");
  const [headings, setHeadings] = useState<HTMLElement[]>([]);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Wait for content to be rendered
    setTimeout(() => {
      if (contentRef.current) {
        const elements = Array.from(contentRef.current.querySelectorAll('h2, h3'));
        setHeadings(elements as HTMLElement[]);

        const observer = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                setActiveSection(entry.target.id);
              }
            });
          },
          {
            rootMargin: '0px 0px -80% 0px',
            threshold: 0.1,
          }
        );

        elements.forEach((heading) => {
          if (heading) observer.observe(heading);
        });

        return () => observer.disconnect();
      }
    }, 100);
  }, [content]);

  const handleMouseMove = (event: MouseEvent) => {
    if (contentRef.current) {
      const headings = Array.from(contentRef.current.querySelectorAll('h2, h3'));
      headings.forEach((heading) => {
        const rect = heading.getBoundingClientRect();
        if (event.clientY >= rect.top && event.clientY <= rect.bottom) {
          setActiveSection(heading.id);
        }
      });
    }
  };

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <NewsHeader isArticlePage={true} />
      <div className="container mx-auto px-4">
        <div className="relative max-w-[2000px] mx-auto">
          <div className="mx-auto py-12 pl-0 pr-48 flex">
            <article className="flex-1 overflow-y-auto">
              <header className="mb-12 border-b border-black pb-8">
                <h1 className="font-serif text-6xl text-black mb-6 leading-tight">{title}</h1>
                <p className="text-2xl text-gray-700 font-serif mb-6 leading-relaxed">{subtitle}</p>
                {heroImage && (
                  <div className="mb-6">
                    <img 
                      src={heroImage} 
                      alt={title}
                      className="w-full h-[400px] object-cover rounded-lg"
                    />
                  </div>
                )}
                <div className="text-sm text-gray-600 flex items-center space-x-4">
                  <span className="font-semibold">By {author}</span>
                  <span>|</span>
                  <span>{date}</span>
                  <span>|</span>
                  <span>{readTime}</span>
                </div>
              </header>

              {inspiration && (
                <div className="mb-8 bg-gray-50 p-6 rounded-lg border border-gray-200">
                  <h3 className="text-lg font-serif font-semibold mb-2">Behind the Story</h3>
                  <p className="text-gray-700 italic">{inspiration}</p>
                </div>
              )}

              <div className="prose prose-newspaper max-w-none" ref={contentRef}>
                {content}
              </div>
            </article>

            <aside className="fixed right-12 top-32 w-56 h-[calc(100vh-8rem)] overflow-y-auto hide-scrollbar">
              <div>
                <div className="mb-4">
                  <h3 className="font-serif text-lg font-bold border-b border-black pb-2">
                    Contents
                  </h3>
                  <nav className="mt-2">
                    {headings.map((heading) => (
                      <a
                        key={heading.id}
                        href={`#${heading.id}`}
                        className={`block py-1 border-l-2 pl-3 text-sm hover:text-black transition-colors ${
                          activeSection === heading.id
                            ? "border-black text-black font-medium"
                            : "border-transparent text-gray-500"
                        }`}
                      >
                        {heading.textContent}
                      </a>
                    ))}
                  </nav>
                </div>

                <div className="mb-4">
                  <h3 className="font-serif text-lg font-bold border-b border-black pb-2">
                    In this Issue
                  </h3>
                  <div className="mt-2 space-y-2">
                    {nextInIssue.map((article) => (
                      <div key={article.path} className="group">
                        <span className="text-xs uppercase tracking-wider text-gray-600">
                          {article.category}
                        </span>
                        <h4 className="font-serif text-lg mt-1">
                          <Link to={article.path} className="hover:underline">
                            {article.title}
                          </Link>
                        </h4>
                        <p className="text-sm text-gray-600 mt-1">
                          {article.excerpt}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="font-serif text-lg font-bold border-b border-black pb-2">
                    Related Stories
                  </h3>
                  <div className="mt-2 space-y-2">
                    {relatedArticles.map((article) => (
                      <div key={article.path}>
                        <span className="text-xs uppercase tracking-wider text-gray-600">
                          {article.category}
                        </span>
                        <h4 className="font-serif text-lg mt-1">
                          <Link to={article.path} className="hover:underline">
                            {article.title}
                          </Link>
                        </h4>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </div>
  );
};
