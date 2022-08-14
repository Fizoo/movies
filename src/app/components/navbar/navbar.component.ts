import { Component, OnInit } from '@angular/core';
import {FilmService} from "../shared/services/film.service";
import {FormControl} from "@angular/forms";
import {debounceTime, distinctUntilChanged, map, switchMap, tap} from "rxjs";

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
      switchMap(el=>this.filmService.searchMovie(el)),
      tap(()=>{
      //this.filmService.searchMovie(el).subscribe()
      }
    )).subscribe()
  }

}
