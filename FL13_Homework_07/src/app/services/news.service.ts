import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

import { News } from '../interfaces/News';
import { NewsSource } from '../interfaces/NewsSource';
import { NEWS, SOURCES } from '../mock/mock.news';

@Injectable({
  providedIn: 'root',
})
export class NewsService {
  constructor() { }

  getNews(
    selectedSourceId: number,
    filterText: string = ''
  ): Observable<News[]> {
    const filterRegexp: RegExp = new RegExp(filterText, 'i');
    return of(
      NEWS.filter(
        ({ sourceId, heading, description }) =>
          (!selectedSourceId || sourceId === selectedSourceId) &&
          (filterRegexp.test(heading) || filterRegexp.test(description))
      )
    );
  }

  getNewsById(forSourceId: number, newsId: number): Observable<News> {
    return of(
      NEWS.find(
        ({ id, sourceId }) =>
          id === newsId && (!forSourceId || sourceId === forSourceId)
      )
    );
  }

  getSources(): Observable<NewsSource[]> {
    return of(SOURCES);
  }

  getSourceById(sourceId: number): Observable<NewsSource> {
    return of(SOURCES.find(({ id }) => id === sourceId));
  }

  getNewId(forSourceId: number): number {
    return (
      1 +
      NEWS.reduce(
        (maxId, { id, sourceId }) =>
          sourceId === forSourceId && id > maxId ? id : maxId,
        0
      )
    );
  }

  addNews(news: News): Observable<News> {
    return this.getSourceById(news.sourceId).pipe(
      map<NewsSource, News>((currentSource) => {
        news.id = this.getNewId(currentSource.id);
        NEWS.push({ ...news });
        return news;
      })
    );
  }
}
