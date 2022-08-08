import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {FilmService} from "../../shared/services/film.service";
import {imgOriginal, imgW500} from "../../shared/helper/img";

import {Credits, CreditsCast} from "../../shared/model/credits";
import {Video, VideoResults} from "../../shared/model/video";
import {SimilarResults} from "../../shared/model/similar";
import {ActivatedRoute} from "@angular/router";
import {map} from "rxjs";
import {IDetail} from "../../shared/model/detail";

@Component({
  selector: 'app-film',
  templateUrl: './film.component.html',
  styleUrls: ['./film.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class FilmComponent implements OnInit {

  film!:IDetail
  imgMini:string
  imgOriginal:string
  casts:CreditsCast[]
  similar:SimilarResults[]
  idFilm:any
  videos:VideoResults[]



  constructor(private filmService:FilmService,
              private route:ActivatedRoute
              ) { }

  ngOnInit(): void {

    this.route.params.pipe(map((el:any)=>el.id) ).subscribe((el)=> this.idFilm=el);

    this.filmService.getDetailFilm(this.idFilm).subscribe((el:IDetail)=> {
      this.film = el
      this.imgMini= imgW500(this.film.poster_path)
      this.imgOriginal= imgOriginal(this.film.backdrop_path)
    })

    this.filmService.getMovieCredits(this.idFilm).subscribe((el:Credits)=>{
      this.casts=el.cast.slice(0,6)
    })

    this.filmService.getMovieVideo(this.idFilm).subscribe((el:Video)=>{
      this.videos=el.results.map(a=>{
        return ({...a,key:`https://www.youtube.com/embed/${a.key}`})
      }).slice(0,3)
    })

    this.filmService.getSimilarMovie(this.idFilm).subscribe((el)=>{
      this.similar=el.map(a=>({...a,poster_path:`http://image.tmdb.org/t/p/w500/${a.poster_path}`}))
    })

  }

   imgW500 (value:string):string  {
    return `http://image.tmdb.org/t/p/w500/${value}`
  }

}

