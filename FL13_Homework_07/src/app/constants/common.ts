import { NewsSource } from '../interfaces/NewsSource';

// routes
export const NEWS_LIST_BASE_URL = 'list';
export const NEWS_ADD_BASE_URL = 'add';
export const NEWS_VIEW_BASE_URL = 'view';

// url params
export const PARAM_SOURCE_ID = 'sourceId';
export const PARAM_NEWS_ID = 'id';

// all news list item
export const ALL_SOURCES: NewsSource = { id: 0, name: 'All sources' };

// empty source item
export const EMPTY_SOURCE: NewsSource = { id: 0, name: '' };

// services api
// export const NEWS_API = 'api/news';
// export const SOURCES_API = 'api/sources';
