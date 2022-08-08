import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { SwiperModule } from 'swiper/angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {NavbarComponent} from "./components/navbar/navbar.component";
import { MainLayoutComponent } from './components/shared/main-layout/main-layout.component';
import { SwiperPageComponent } from './components/swiper-page/swiper-page.component';
import { FilmListComponent } from './components/film-list/film-list.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import {HttpClientModule} from "@angular/common/http";
import { PosterDirective } from './components/film-list/poster.directive';
import { FilmComponent } from './components/film/film.component';



@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    MainLayoutComponent,
    SwiperPageComponent,
    FilmListComponent,
    HomePageComponent,
    PosterDirective,
    FilmComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SwiperModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
