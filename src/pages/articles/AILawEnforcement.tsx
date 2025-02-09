import { ArticleTemplate } from "@/components/ArticleTemplate";

const AILawEnforcement = () => {
  return (
    <ArticleTemplate
      title="AI in Law Enforcement"
      subtitle="Balancing technology and privacy in policing"
      author="Sarah Thompson"
      date="March 25, 2024"
      readTime="7 min read"
      content={
        <>
          <p>
            As law enforcement agencies increasingly adopt AI technologies, the balance between public safety and civil liberties is under scrutiny.
          </p>
          <h2>Usage of AI in Policing</h2>
          <p>
            AI is being used for surveillance, predictive policing, and facial recognition, raising important ethical concerns.
          </p>
          <h2>Privacy Concerns</h2>
          <p>
            Experts argue that transparent policies are needed to protect individual privacy rights.
          </p>
        </>
      }
    />
  );
};

export default AILawEnforcement; 