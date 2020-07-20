import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { NewsListComponent } from './components/news-list/news-list.component';
import { CreateNewsComponent } from './components/create-news/create-news.component';
import { FullViewComponent } from './components/full-view/full-view.component';
import { ShortNewsComponent } from './components/short-news/short-news.component';

import { NewsService } from './services/news.service';

import { AppRoutingModule } from './app-routing.module';

@NgModule({
  declarations: [
    AppComponent,
    NewsListComponent,
    CreateNewsComponent,
    FullViewComponent,
    ShortNewsComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, FormsModule, ReactiveFormsModule],
  providers: [NewsService],
  bootstrap: [AppComponent],
})
export class AppModule { }
