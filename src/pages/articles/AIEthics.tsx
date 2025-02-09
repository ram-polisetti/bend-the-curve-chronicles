import { ArticleTemplate } from "@/components/ArticleTemplate";

const AIEthics = () => {
  return (
    <ArticleTemplate
      title="Navigating AI Ethics in 2024"
      subtitle="Understanding and addressing ethical challenges in AI"
      author="David Kim"
      date="March 26, 2024"
      readTime="8 min read"
      content={
        <>
          <p>
            A deep dive into the ethical challenges that accompany the rapid advancement of artificial intelligence and the measures needed to address them.
          </p>
          <h2>Ethical Challenges</h2>
          <p>
            Issues such as bias, transparency, and accountability are central to the ethical debate.
          </p>
          <h2>Proposed Solutions</h2>
          <p>
            Industry experts propose a combination of regulation, corporate responsibility, and public oversight to mitigate potential harms.
          </p>
        </>
      }
    />
  );
};

export default AIEthics; 