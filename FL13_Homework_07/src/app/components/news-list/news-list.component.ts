import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl } from '@angular/forms';

import { News } from '../../interfaces/News';
import { NewsSource } from '../../interfaces/NewsSource';
import { NewsService } from '../../services/news.service';
import {
  PARAM_SOURCE_ID,
  ALL_SOURCES,
  NEWS_LIST_BASE_URL,
} from '../../constants/common';

const EMPTY_SOURCE: NewsSource = { id: 0, name: '' };

@Component({
  selector: 'app-news-list',
  templateUrl: './news-list.component.html',
  styleUrls: ['./news-list.component.css'],
})
export class NewsListComponent implements OnInit {
  sourcesList: NewsSource[] = [];
  newsList: News[] = [];
  currentSource: NewsSource;
  selectSourceId: FormControl = new FormControl();
  filter: FormControl = new FormControl('');

  constructor(
    private newsService: NewsService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getSources();
    const sourceId = +this.route.snapshot.paramMap.get(PARAM_SOURCE_ID);
    this.selectSourceId.setValue(sourceId);
    this.initData(sourceId);
    this.selectSourceId.valueChanges.subscribe((newSourceId) => {
      this.router
        .navigate([`/${NEWS_LIST_BASE_URL}/${newSourceId}`])
        .then((_) => this.initData(+newSourceId));
    });
  }

  initData(sourceId: number) {
    this.getNews(sourceId);
    this.getSourceName(sourceId);
  }

  getNews(
    sourceId: number = this.selectSourceId.value,
    filterText: string = this.filter.value
  ): void {
    this.newsService
      .getNews(+sourceId, filterText)
      .subscribe((news) => (this.newsList = news));
  }

  getSources(): void {
    this.newsService.getSources().subscribe((sources) => {
      this.sourcesList = [ALL_SOURCES, ...sources];
    });
  }

  getSourceName(newSourceId: number = 0): void {
    this.currentSource = this.sourcesList.find(({ id }) => id === newSourceId);
  }
}
