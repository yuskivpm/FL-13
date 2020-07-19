export interface News {
  id: number;
  sourceId: number;
  heading: string;
  description: string;
  content: string;
  date: Date;
  author: string;
  imageUrl: string;
}
