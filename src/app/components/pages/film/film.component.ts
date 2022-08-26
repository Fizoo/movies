import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {FilmService} from "../../shared/services/film.service";

import {Credits, CreditsCast} from "../../shared/model/credits";
import {Video, VideoResults} from "../../shared/model/video";
import {SimilarResults} from "../../shared/model/similar";
import {ActivatedRoute} from "@angular/router";
import {map, switchMap, tap} from "rxjs";
import {IDetail} from "../../shared/model/detail";
import {DetailFilmService} from "../../shared/services/detail-film.service";
import {ReviewResults} from "../../shared/model/review";


@Component({
  selector: 'app-film',
  templateUrl: './film.component.html',
  styleUrls: ['./film.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class FilmComponent implements OnInit {

  film: IDetail
  casts: CreditsCast[]
  similar: SimilarResults[]
  reviews: ReviewResults[]=[]
  videos: VideoResults[]

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
    })

  }



}

