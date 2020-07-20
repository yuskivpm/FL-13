import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { News } from '../../interfaces/News';
import { NewsService } from '../../services/news.service';
import {
  PARAM_SOURCE_ID,
  PARAM_NEWS_ID,
  EMPTY_SOURCE,
  FULL_VIEW_FAIL_LOAD_DATA,
} from '../../constants/common';

@Component({
  selector: 'app-full-view',
  templateUrl: './full-view.component.html',
  styleUrls: ['./full-view.component.css'],
})
export class FullViewComponent implements OnInit {
  newsDetail: News;
  sourceId: number = 0;
  sourceName: string = '';
  error: string = '';

  constructor(
    private route: ActivatedRoute,
    private newsService: NewsService
  ) { }

  ngOnInit(): void {
    this.sourceId = +(this.route.snapshot.paramMap.get(PARAM_SOURCE_ID) || 0);
    this.getNewsById(+this.route.snapshot.paramMap.get(PARAM_NEWS_ID));
  }

  getNewsById(newsId: number): void {
    this.newsService.getNewsById(this.sourceId, newsId).subscribe((news) => {
      if (news) {
        this.newsDetail = news;
        this.newsService
          .getSourceById(news.sourceId)
          .subscribe(
            ({ name } = { ...EMPTY_SOURCE }) => (this.sourceName = name)
          );
      } else {
        this.error = FULL_VIEW_FAIL_LOAD_DATA;
      }
    });
  }
}
