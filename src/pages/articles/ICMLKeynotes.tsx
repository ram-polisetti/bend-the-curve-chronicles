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
          <h2>Keynote Speakers</h2>
          <p>
            The conference lineup includes renowned figures in the field of AI who will share their insights on current trends and future directions.
          </p>
          <h2>Conference Highlights</h2>
          <p>
            Attendees can expect a series of groundbreaking presentations and panel discussions.
          </p>
        </>
      }
    />
  );
};

export default ICMLKeynotes; 