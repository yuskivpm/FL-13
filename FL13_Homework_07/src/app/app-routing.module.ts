import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NewsListComponent } from './components/news-list/news-list.component';
import { CreateNewsComponent } from './components/create-news/create-news.component';
import { FullViewComponent } from './components/full-view/full-view.component';

const routes: Routes = [
  { path: 'list/:sourceId', component: NewsListComponent },
  { path: 'add/:sourceId', component: CreateNewsComponent },
  { path: 'view/:sourceId/:id', component: FullViewComponent },
  { path: '**', redirectTo: '/list/0' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
