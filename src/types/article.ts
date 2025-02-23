
export interface Article {
  id: string;
  title: string;
  subtitle: string | null;
  content: string;
  read_time: string;
  author: string;
  created_at: string;
  hero_image: string | null;
  views: number;
  category: string;
}
