import { ArticleTemplate } from "@/components/ArticleTemplate";

const AIEducation = () => {
  return (
    <ArticleTemplate
      title="AI in Education: Personalized Learning Paths"
      subtitle="How AI is transforming educational experiences"
      author="Emma Garcia"
      date="April 10, 2024"
      readTime="6 min read"
      content={
        <>
          <p>
            AI technologies are increasingly being used to create personalized learning experiences, tailoring educational content to meet individual student needs.
          </p>
          <h2>Adaptive Learning</h2>
          <p>
            Intelligent systems analyze student performance to provide customized resources and recommendations.
          </p>
          <h2>Future of Education</h2>
          <p>
            These innovations are set to transform traditional educational models and improve student outcomes globally.
          </p>
        </>
      }
    />
  );
};

export default AIEducation; 