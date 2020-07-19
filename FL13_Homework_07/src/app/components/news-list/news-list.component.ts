import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { FormControl } from '@angular/forms';

import { News } from '../../interfaces/News';
import { NewsSource } from '../../interfaces/NewsSource';
import { NewsService } from '../../services/news.service';
import { PARAM_SOURCE_ID, ALL_SOURCES } from '../../constants/common';

const EMPTY_SOURCE: NewsSource = { id: 0, name: '' };

@Component({
  selector: 'app-news-list',
  templateUrl: './news-list.component.html',
  styleUrls: ['./news-list.component.css'],
})
export class NewsListComponent implements OnInit {
  sourcesList: NewsSource[] = [];
  newsList: News[] = [];
  sourceId: number = 0;
  currentSource: NewsSource;
  selectSourceId: FormControl = new FormControl(0);

  constructor(
    private newsService: NewsService,
    private route: ActivatedRoute,
    private location: Location
  ) {}

  ngOnInit(): void {
    selectSourceId.this.sourceId = +this.route.snapshot.paramMap.get(
      PARAM_SOURCE_ID
    );
    this.getSources();
    this.getNews(this.sourceId);
  }

  getNews(sourceId: number = this.sourceId): void {
    this.newsService
      .getNews(sourceId)
      .subscribe((news) => (this.newsList = news));
  }

  getSources(): void {
    this.newsService.getSources().subscribe((sources) => {
      this.sourcesList = [ALL_SOURCES, ...sources];
      this.getSourceName();
    });
  }

  getSourceName(): void {
    this.newsService
      .getSourceById(+this.sourceId)
      .subscribe((source) => (this.currentSource = source));
  }
}
