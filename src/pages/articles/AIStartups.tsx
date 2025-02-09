import { ArticleTemplate } from "@/components/ArticleTemplate";

const AIStartups = () => {
  return (
    <ArticleTemplate
      title="AI Startups Raise $10B in Q1"
      subtitle="A surge of investment in innovative AI ventures"
      author="Michael Chen"
      date="April 7, 2024"
      readTime="5 min read"
      content={
        <>
          <p>
            A record amount of investment has flowed into AI startups this quarter, signaling strong investor confidence in the future of artificial intelligence.
          </p>
          <h2>Funding Highlights</h2>
          <p>
            Several startups have secured substantial funding to accelerate their growth and product development.
          </p>
          <h2>Future Outlook</h2>
          <p>
            The surge in investment is expected to drive innovation and competition in the booming AI sector.
          </p>
        </>
      }
    />
  );
};

export default AIStartups; 