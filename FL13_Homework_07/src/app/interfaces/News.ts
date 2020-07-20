import { ItemWithId } from './ItemWithId';

export interface News extends ItemWithId {
  sourceId: number;
  heading: string;
  description: string;
  content: string;
  date: Date;
  author: string;
  imageUrl: string;
}
