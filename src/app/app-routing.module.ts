import {NgModule} from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';
import {HomePageComponent} from './components/home-page/home-page.component';

import {MainLayoutComponent} from './components/shared/components/main-layout/main-layout.component';
import {FilmComponent} from "./components/pages/film/film.component";
import {ActorComponent} from './components/pages/actor/actor.component';
import {MoviesComponent} from "./components/movies/movies.component";
import {SeriesComponent} from "./components/serial/serials/series.component";
import {DetailTVComponent} from "./components/serial/detail-tv/detail-tv.component";
import { FavoritesComponent } from './components/favorites/favorites.component';


const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      {path: '',redirectTo:'/',pathMatch:'full'},
      {path: '', component: HomePageComponent},
      {path: 'film/:id', component: FilmComponent},
      {path: 'actor/:id', component: ActorComponent},
      {path: 'movies', component: MoviesComponent},
      {path: 'serials', component: SeriesComponent},
      {path: 'serials/:id', component: DetailTVComponent},
      {path:'favorite',component:FavoritesComponent}
    ]
  },
  {path:'admin',
    loadChildren:()=>import('./admin/admin.module').then(m=>m.AdminModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{
    preloadingStrategy:PreloadAllModules
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
