import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
// import { HttpClientModule } from '@angular/common/http';
// import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';

import { AppComponent } from './app.component';
import { NewsListComponent } from './components/news-list/news-list.component';
import { CreateNewsComponent } from './components/create-news/create-news.component';
import { FullViewComponent } from './components/full-view/full-view.component';
import { ShortNewsComponent } from './components/short-news/short-news.component';

import { AppRoutingModule } from './app-routing.module';
// import { InMemoryDataService } from './services/in-memory-data.service';

@NgModule({
  declarations: [
    AppComponent,
    NewsListComponent,
    CreateNewsComponent,
    FullViewComponent,
    ShortNewsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    // HttpClientModule,
    // HttpClientInMemoryWebApiModule.forRoot(InMemoryDataService, {
    //   dataEncapsulation: false,
    // }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
