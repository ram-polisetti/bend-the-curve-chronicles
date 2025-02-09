import { ArticleTemplate } from "@/components/ArticleTemplate";

const AIHealthcare = () => {
  return (
    <ArticleTemplate
      title="AI in Healthcare"
      subtitle="Transforming patient diagnosis and treatment plans"
      author="Ethan Harris"
      date="April 5, 2024"
      readTime="8 min read"
      content={
        <>
          <p>
            AI is revolutionizing the healthcare industry by providing advanced tools for early diagnosis and personalized treatment.
          </p>
          <h2>Diagnostic Advancements</h2>
          <p>
            Machine learning models are enabling more accurate and timely diagnoses, ultimately improving patient outcomes.
          </p>
          <h2>Personalized Medicine</h2>
          <p>
            The integration of AI in healthcare is paving the way for personalized treatment strategies tailored to individual patient needs.
          </p>
        </>
      }
    />
  );
};

export default AIHealthcare; 