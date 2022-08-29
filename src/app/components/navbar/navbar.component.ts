import {Component, OnInit} from '@angular/core';
import {FilmService} from "../shared/services/film.service";
import {FormControl} from "@angular/forms";
import {debounceTime, distinctUntilChanged, map, tap} from "rxjs";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  search=new FormControl()

  constructor(private filmService:FilmService) { }

  ngOnInit(): void {
    this.search.valueChanges.pipe(
      debounceTime(500),
      map(el=>el.trim()),
      distinctUntilChanged(),
      tap(el=>this.filmService.addSearchParams({query:el})),
      tap((el)=>{
        if (!el){

          this.filmService.tempList$.next([])
          return this.filmService.resetParams()

        }
      }
    )).subscribe()
  }

}
