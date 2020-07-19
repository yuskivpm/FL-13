import { Component, OnInit } from '@angular/core';
import { News } from '../../interfaces/News';

@Component({
  selector: 'app-create-news',
  templateUrl: './create-news.component.html',
  styleUrls: ['./create-news.component.css'],
})
export class CreateNewsComponent implements OnInit {
  news: News = {
    id: 1,
    sourceId: 1,
    heading: 'Header',
    description: 'Short description',
    content: 'All content text',
    date: new Date(),
    author: 'Author of news',
    imageUrl: 'https://telegraf.com.ua/files/2014/01/5_11.jpg',
  };

  constructor() {}

  ngOnInit(): void {}

  onSave(): void {}
}
