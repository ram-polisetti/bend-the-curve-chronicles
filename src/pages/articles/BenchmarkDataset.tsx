import { ArticleTemplate } from "@/components/ArticleTemplate";

const BenchmarkDataset = () => {
  return (
    <ArticleTemplate
      title="New Benchmark Dataset Released"
      subtitle="A comprehensive dataset for evaluating AI models"
      author="Sophia Rodriguez"
      date="April 8, 2024"
      readTime="6 min read"
      content={
        <>
          <p>
            Researchers have released a new benchmark dataset that promises to standardize the evaluation of AI models across a variety of tasks.
          </p>
          <h2>Dataset Overview</h2>
          <p>
            The dataset includes diverse data sources and has been designed to challenge and validate AI performance.
          </p>
          <h2>Community Impact</h2>
          <p>
            This new resource is expected to accelerate research and development in the field of artificial intelligence.
          </p>
        </>
      }
    />
  );
};

export default BenchmarkDataset; 