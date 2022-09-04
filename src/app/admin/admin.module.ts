import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import { AdminLayoutComponent } from './component/admin-layout/admin-layout.component';
import { LoginComponent } from './component/login/login.component';
import { AdminNavbarComponent } from './component/admin-navbar/admin-navbar.component';
import {ReactiveFormsModule} from "@angular/forms";


const routes:Routes=[
  {
  path: '', component: AdminLayoutComponent,children:[
      {path: '', pathMatch: 'full', redirectTo: '/admin/login'},
      {path: 'login', component: LoginComponent},
    ]
  }
]

@NgModule({
  declarations: [
    AdminLayoutComponent,
    LoginComponent,
    AdminNavbarComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
  ],
  exports:[
    RouterModule
  ]
})
export class AdminModule { }
