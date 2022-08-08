import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import SwiperCore, {Keyboard, Mousewheel, Navigation, Pagination,} from "swiper";
import {RootObject} from "../../model/model";
import {FilmService} from "../../services/film.service";

SwiperCore.use([Navigation, Pagination, Mousewheel, Keyboard]);

@Component({
  selector: 'app-swiper-page',
  templateUrl: './swiper-page.component.html',
  styleUrls: ['./swiper-page.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class SwiperPageComponent implements OnInit {

  list:RootObject[]

  constructor(private filmService:FilmService
  ) { }

  ngOnInit(): void {
    this.filmService.getPopularFilms().subscribe((el:RootObject[])=> {
      this.list = el
    })
  }

}
