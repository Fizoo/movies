import {Component, OnInit} from '@angular/core';
import {FilmService} from "../../services/film.service";
import {RootObject} from "../../model/model";
import {genres} from "../../../../../assets/data";
import {Router} from "@angular/router";

@Component({
  selector: 'app-film-list',
  templateUrl: './film-list.component.html',
  styleUrls: ['./film-list.component.scss']
})
export class FilmListComponent implements OnInit {

  list: RootObject[]

  constructor(private filmService: FilmService,
              public router: Router
  ) {
  }

  ngOnInit(): void {
    this.filmService.getFilm().subscribe((el: any) => {
      this.list = el
    })
  }

  getGenres(id: number) {
    return genres.filter(el => el.id === id).map(el => el.name)

  }


}
