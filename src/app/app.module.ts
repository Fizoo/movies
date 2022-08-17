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
import { PosterDirective } from './components/shared/components/film-list/poster.directive';
import { FilmComponent } from './components/pages/film/film.component';
import { SafePipe } from './components/shared/pipes/safe.pipe';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { ActorComponent } from './components/pages/actor/actor.component';



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
    ActorComponent
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
