import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomePageComponent} from './components/home-page/home-page.component';

import {MainLayoutComponent} from './components/shared/components/main-layout/main-layout.component';
import {FilmComponent} from "./components/pages/film/film.component";

const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      {path: '',redirectTo:'/',pathMatch:'full'},
      {path: '', component: HomePageComponent},
      {path: 'film/:id', component: FilmComponent},


    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
