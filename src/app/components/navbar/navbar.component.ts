import {Component, OnDestroy, OnInit} from '@angular/core';
import {FilmService} from "../shared/services/film.service";
import {FormControl} from "@angular/forms";
import {debounceTime, distinctUntilChanged, map, Subscription, tap} from "rxjs";

import {Router} from '@angular/router';
import {AuthFireService} from "../../admin/service/auth-fire.service";
import {SerialService} from "../serial/serial.service";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit,OnDestroy {
  search=new FormControl()

  aSub:Subscription
  isAuth:boolean

  constructor(private filmService:FilmService,
              private router:Router,
              private authFire:AuthFireService,
              private serialService:SerialService,
            
              ) { }

  ngOnInit(): void {
   this.aSub= this.search.valueChanges.pipe(
      debounceTime(500),
      map(el=>el.trim()),
      distinctUntilChanged(),
      tap(el=> {
        let arr= this.router.url.split('/').filter(Boolean)
        if (!arr.length){
          this.filmService.addSearchParams({query: el})
        }
        else {
          if(arr.find(el=>el==='movies')){
            this.filmService.addSearchParams({query: el})
          }
          if(arr.find(el=>el==='serials')){
            this.serialService.searchStr$.next(el)
          }
        }
      }),
      tap((el)=>{
        if (!el){
          this.filmService.tempList$.next([])
          return this.filmService.resetParams()
        }
      })).subscribe()


    this.isAuth=this.authFire.isAuthenticated()
  }

  logout(event:any) {
    event.preventDefault()
    this.authFire.logout()
    this.router.navigate(['/admin','login']).then(()=>console.log('logout'))
  }

  ngOnDestroy(): void {
    if (this.aSub){
      this.aSub.unsubscribe()
    }

  }

}
