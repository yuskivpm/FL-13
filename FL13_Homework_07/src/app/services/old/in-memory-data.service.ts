import { Injectable } from '@angular/core';
import { InMemoryDbService, RequestInfo } from 'angular-in-memory-web-api';

import { NEWS, SOURCES } from '../../mock/mock.news';
import { NEWS_API } from '../../constants/common';

interface ItemWithId {
  id: number;
}

@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {
  constructor() {}

  createDb(options: RequestInfo) {
    return options.url.startsWith(NEWS_API) ? NEWS : SOURCES;
  }

  genId(items: ItemWithId[]): number {
    return items.reduce((maxId, { id }) => Math.max(id, maxId), 0) + 1;
  }
}
