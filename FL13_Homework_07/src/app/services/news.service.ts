import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
// import { catchError, map, tap } from 'rxjs/operators';
// import { HttpClient, HttpHeaders } from '@angular/common/http';

import { News } from '../interfaces/News';
import { NewsSource } from '../interfaces/NewsSource';
// import { NEWS_API, SOURCES_API } from '../constants/common';
import { NEWS, SOURCES } from '../mock/mock.news';

@Injectable({
  providedIn: 'root',
})
export class NewsService {
  constructor(/* private http: HttpClient */) {}

  getNews(
    selectedSourceId: number,
    filterText: string = ''
  ): Observable<News[]> {
    // return this.http
    //   .get<News[]>(`${NEWS_API}`)
    //   .pipe(catchError(this.handleError<News[]>('getNews', [])));
    const filterRegexp = new RegExp(filterText, 'i');
    return of(
      NEWS.filter(
        ({ sourceId, heading, description }) =>
          (!selectedSourceId || sourceId === selectedSourceId) &&
          (filterRegexp.test(heading) || filterRegexp.test(description))
      )
    );
  }

  getNewsById(newsId: number): Observable<News> {
    return of(NEWS.find(({ id }) => id === newsId));
  }

  getSources(): Observable<NewsSource[]> {
    // return this.http
    //   .get<NewsSource[]>(`${SOURCES_API}`)
    //   .pipe(catchError(this.handleError<NewsSource[]>('getSources', [])));
    return of(SOURCES);
  }

  // private handleError<T>(operation: string, defaultResult?: T) {
  //   return (error: any): Observable<T> => {
  //     console.error(`Fail in ${operation}`, error);
  //     return of(defaultResult as T);
  //   };
  // }
}
