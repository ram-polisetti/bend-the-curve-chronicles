import { ArticleTemplate } from "@/components/ArticleTemplate";

const ICMLKeynotes = () => {
  return (
    <ArticleTemplate
      title="Conference Updates: ICML Announces Keynotes"
      subtitle="Highlights from the latest announcements at ICML"
      author="Daniel Kim"
      date="April 9, 2024"
      readTime="5 min read"
      content={
        <>
          <p>
            The International Conference on Machine Learning (ICML) has announced its keynote speakers, featuring leading experts from academia and industry.
          </p>
          <h2 id="keynote-speakers">Keynote Speakers</h2>
          <p>
            The conference lineup includes renowned figures in the field of AI who will share their insights on current trends and future directions.
          </p>
          <h2 id="conference-highlights">Conference Highlights</h2>
          <p>
            Attendees can expect a series of groundbreaking presentations and panel discussions.
          </p>
          <h2 id="future-directions">Future Directions</h2>
          <p>
            As the conference unfolds, it will play a critical role in shaping the future of AI research and development.
          </p>
        </>
      }
      relatedArticles={[
        {
          title: "AI in Manufacturing: Intelligent Automation",
          path: "/articles/ai-manufacturing",
          category: "Manufacturing"
        },
        {
          title: "AI Models Achieve Human-Level Reasoning",
          path: "/articles/ai-human-reasoning",
          category: "AI Research"
        },
        {
          title: "Deep Learning Trends to Watch",
          path: "/articles/deep-learning-trends",
          category: "Deep Learning"
        }
      ]}
      nextInIssue={[
        {
          title: "AI in Healthcare: Transforming Patient Care",
          path: "/articles/ai-healthcare",
          category: "Healthcare",
          excerpt: "AI-driven insights are revolutionizing patient diagnosis and treatment."
        },
        {
          title: "AI in Education: Personalized Learning Paths",
          path: "/articles/ai-education",
          category: "Education",
          excerpt: "How AI is transforming educational experiences."
        },
        {
          title: "AI in Agriculture: Precision Farming",
          path: "/articles/ai-agriculture",
          category: "Agriculture",
          excerpt: "Optimizing crop yields and reducing resource waste."
        }
      ]}
    />
  );
};

export default ICMLKeynotes; 