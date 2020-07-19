import { Component, OnInit, Input } from '@angular/core';

import { News } from '../../interfaces/News';

@Component({
  selector: 'app-short-news',
  templateUrl: './short-news.component.html',
  styleUrls: ['./short-news.component.css'],
})
export class ShortNewsComponent implements OnInit {
  @Input() newsItem: News;

  constructor() {}

  ngOnInit(): void {}
}
