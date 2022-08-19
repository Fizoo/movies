import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {FilmService} from "../../shared/services/film.service";
import {imgOriginal, imgW500} from "../../shared/helper/img";

import {Credits, CreditsCast} from "../../shared/model/credits";
import {Video, VideoResults} from "../../shared/model/video";
import {SimilarResults} from "../../shared/model/similar";
import {ActivatedRoute} from "@angular/router";
import {map, switchMap, tap} from "rxjs";
import {IDetail} from "../../shared/model/detail";
import {DetailFilmService} from "../../shared/services/detail-film.service";
import {ReviewResults} from "../../shared/model/review";
//import { imgTemp as } from '../../../../assets/logo/logo-2.png'

@Component({
  selector: 'app-film',
  templateUrl: './film.component.html',
  styleUrls: ['./film.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class FilmComponent implements OnInit {

  film: IDetail
  imgMini: string
  imgOriginal: string
  casts: CreditsCast[]
  similar: SimilarResults[]
  reviews: ReviewResults[]
  videos: VideoResults[]
  vote: number[] = []
  voteAll: any
  imgTemp='../../../../assets/logo/logo-2.png'


  constructor(private filmService: FilmService,
              private detailFilmService: DetailFilmService,
              private route: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    this.route.params.pipe(map((el: any) => el.id),
      tap(id => {
        this.detailFilmService.filmId$.next(id)

        this.detailFilmService.getSimilarMovie(id).subscribe((el) => {
          this.similar = el.map(a => ({...a, poster_path: `http://image.tmdb.org/t/p/w500/${a.poster_path}`}))
        })

        this.detailFilmService.getMovieCredits(id).subscribe((el: Credits) => {
          this.casts = el.cast.slice(0, 6)
        })

        this.detailFilmService.getMovieVideo(id).subscribe((el: Video) => {
          this.videos = el.results.map(a => ({...a, key: `https://www.youtube.com/embed/${a.key}`})).slice(0, 3)
        })

        this.detailFilmService.getReviews(id).subscribe(el=> {
          this.reviews = el
        })
      }),

      switchMap(() => this.detailFilmService.film$),
    ).subscribe(data => {
      this.film = data
      this.imgMini = data.poster_path ? imgW500(this.film.poster_path) : 'https://www.beano.com/wp-content/uploads/legacy/88190_logo1-b.jpg?strip=all&quality=86&w=887'
      this.imgOriginal = data.backdrop_path ? imgOriginal(this.film.backdrop_path) : 'https://www.beano.com/wp-content/uploads/legacy/88190_logo1-b.jpg?strip=all&quality=86&w=887'
      this.vote = Array(Math.floor(data.vote_average)).fill(1)
      this.voteAll = data.vote_average < 9 ? Array(9 - Math.floor(data.vote_average)).fill(1) : []
    })

    this.detailFilmService.filmId$.subscribe(() => {
      //  console.log('sem',el)
    })

  }

  imgW500(value: string): string {
    return `http://image.tmdb.org/t/p/w500/${value}`
  }
  getImgRev(value:string):string{
    //debugger
    if(!!value) {
      let url = value.slice(1)

      if (url.split(':')[0] === 'https')
        return url
      else
        return  `http://image.tmdb.org/t/p/w500/${url}`
    }
    else
    return '../../../../assets/logo/logo-2.png'
  }




}

