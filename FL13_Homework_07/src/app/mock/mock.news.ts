import { News } from '../interfaces/News';
import { NewsSource } from '../interfaces/NewsSource';

export const NEWS: News[] = [
  {
    id: 1,
    sourceId: 1,
    heading: 'Top news',
    description: 'First news from BBC',
    content: 'All content text',
    date: new Date(),
    author: 'Author of news',
    imageUrl: 'https://telegraf.com.ua/files/2014/01/5_11.jpg',
  },
  {
    id: 2,
    sourceId: 1,
    heading: 'Top news',
    description: 'Second news from BBC',
    content: 'All content text',
    date: new Date(),
    author: 'Author of news',
    imageUrl: 'https://telegraf.com.ua/files/2014/01/5_11.jpg',
  },
  {
    id: 3,
    sourceId: 2,
    heading: 'Top news',
    description: 'First news from CNN ',
    content: 'All content text',
    date: new Date(),
    author: 'Author of news',
    imageUrl: 'https://telegraf.com.ua/files/2014/01/5_11.jpg',
  },
  {
    id: 4,
    sourceId: 2,
    heading: 'Top news',
    description: 'Second news from CNN',
    content: 'All content text',
    date: new Date(),
    author: 'Author of news',
    imageUrl: 'https://telegraf.com.ua/files/2014/01/5_11.jpg',
  },
];

export const SOURCES: NewsSource[] = [
  { id: 1, name: 'BBC' },
  { id: 2, name: 'CNN' },
];
