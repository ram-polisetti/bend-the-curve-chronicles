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
  relatedArticles: RelatedArticle[];
  nextInIssue: NextInIssue[];
}

export const ArticleTemplate = ({
  title,
  subtitle,
  author,
  date,
  readTime,
  content,
  relatedArticles,
  nextInIssue,
}: ArticleTemplateProps) => {
  const [activeSection, setActiveSection] = useState<string>("");
  const contentRef = useRef<HTMLDivElement>(null);

  // Extract headings from content for table of contents
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.5 }
    );

    const headings = contentRef.current?.querySelectorAll("h2");
    headings?.forEach((heading) => observer.observe(heading));

    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <NewsHeader isArticlePage={true} />
      <div className="relative max-w-[2000px] mx-auto">
        {/* Left Sidebar - Table of Contents */}
        <aside className="fixed left-8 top-32 w-72">
          <div className="space-y-4">
            <h3 className="font-serif text-lg font-bold mb-4">Contents</h3>
            <nav className="space-y-2 text-sm">
              {Array.from(contentRef.current?.querySelectorAll("h2") || []).map((heading) => (
                <a
                  key={heading.id}
                  href={`#${heading.id}`}
                  className={`block py-1 border-l-2 pl-3 hover:text-black transition-colors ${
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
        </aside>

        {/* Main Content */}
        <div className="mx-auto px-4 py-12 ml-80 mr-96">
          <article>
            {/* Article Header */}
            <header className="mb-12 border-b border-black pb-8">
              <h1 className="font-serif text-6xl text-black mb-6 leading-tight">{title}</h1>
              <p className="text-2xl text-gray-700 font-serif mb-6 leading-relaxed">{subtitle}</p>
              <div className="text-sm text-gray-600 flex items-center space-x-4">
                <span className="font-semibold">By {author}</span>
                <span>|</span>
                <span>{date}</span>
                <span>|</span>
                <span>{readTime}</span>
              </div>
            </header>

            <div className="prose prose-newspaper max-w-none" ref={contentRef}>
              {content}
            </div>
          </article>
        </div>

        {/* Right Sidebar */}
        <aside className="fixed right-8 top-32 w-80">
          <div className="space-y-12">
            {/* In this Issue */}
            <div className="space-y-6">
              <h3 className="font-serif text-lg font-bold border-b border-black pb-2">
                In this Issue
              </h3>
              <div className="space-y-6">
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
                    <p className="text-sm text-gray-600 mt-2 line-clamp-2">
                      {article.excerpt}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Related Articles */}
            <div className="space-y-6">
              <h3 className="font-serif text-lg font-bold border-b border-black pb-2">
                Related Stories
              </h3>
              <div className="space-y-6">
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
  );
};
