import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NewsListComponent } from './components/news-list/news-list.component';
import { CreateNewsComponent } from './components/create-news/create-news.component';
import { FullViewComponent } from './components/full-view/full-view.component';
import {
  PARAM_SOURCE_ID,
  PARAM_NEWS_ID,
  NEWS_LIST_BASE_URL,
  NEWS_ADD_BASE_URL,
  NEWS_VIEW_BASE_URL,
} from './constants/common';

const routes: Routes = [
  {
    path: `${NEWS_LIST_BASE_URL}/:${PARAM_SOURCE_ID}`,
    component: NewsListComponent,
  },
  {
    path: `${NEWS_ADD_BASE_URL}/:${PARAM_SOURCE_ID}`,
    component: CreateNewsComponent,
  },
  {
    path: `${NEWS_VIEW_BASE_URL}/:${PARAM_SOURCE_ID}/:${PARAM_NEWS_ID}`,
    component: FullViewComponent,
  },
  { path: '**', redirectTo: `/${NEWS_LIST_BASE_URL}/0` },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
