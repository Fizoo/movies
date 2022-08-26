import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { SwiperModule } from 'swiper/angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {NavbarComponent} from "./components/navbar/navbar.component";
import { MainLayoutComponent } from './components/shared/components/main-layout/main-layout.component';
import { SwiperPageComponent } from './components/shared/components/swiper-page/swiper-page.component';
import { FilmListComponent } from './components/shared/components/film-list/film-list.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import {HttpClientModule} from "@angular/common/http";
import { PosterDirective } from './components/shared/directive/poster.directive';
import { FilmComponent } from './components/pages/film/film.component';
import { SafePipe } from './components/shared/pipes/safe.pipe';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { ActorComponent } from './components/pages/actor/actor.component';
import { MoviesComponent } from './components/movies/movies.component';
import { SerialsComponent } from './components/shared/components/serials/serials.component';
import { SeriesComponent } from './components/serial/serials/series.component';
import { DetailTVComponent } from './components/serial/detail-tv/detail-tv.component';
import { VoteDirective } from './components/shared/directive/vote.directive';
import { ImgReviewDirective } from './components/shared/directive/img-review.directive';



@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    MainLayoutComponent,
    SwiperPageComponent,
    FilmListComponent,
    HomePageComponent,
    PosterDirective,
    FilmComponent,
    SafePipe,
    ActorComponent,
    MoviesComponent,
    SerialsComponent,
    SeriesComponent,
    DetailTVComponent,
    VoteDirective,
    ImgReviewDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SwiperModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
