export interface IBlog {
  id: number;
  title: string;
  description: string;
  author: string;
  category: string;
  tags: string[];
  content: string;
  isPublished: boolean;
}
