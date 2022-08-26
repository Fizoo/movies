import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {DetailTV} from "../model/detail";
import {SerialService} from '../serial.service';
import {map, switchMap, tap} from "rxjs";
import {ActivatedRoute} from "@angular/router";
import {CreditsTVCast} from "../model/credits";
import {VideoTvResults} from "../model/video";
import {SimilarTVResults} from "../model/similar";
import {ReviewTVResults} from "../model/review";

@Component({
  selector: 'app-detail-tv',
  templateUrl: './detail-tv.component.html',
  styleUrls: ['./detail-tv.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class DetailTVComponent implements OnInit {

  tv: DetailTV
  id: number

  casts: CreditsTVCast[]
  videos: VideoTvResults[]
  similar: SimilarTVResults[]
  reviews: ReviewTVResults[]

  constructor(private serialService: SerialService,
              private route: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    this.route.params
      .pipe(map(params => params['id']),
        tap(id=>{

          this.serialService.getMovieCredits(id).subscribe(data=> {
            this.casts = data.cast.slice(0,6)})

          this.serialService.getMovieVideo(id).subscribe(data=>{
            this.videos = data.map(a => ({...a, key: `https://www.youtube.com/embed/${a.key}`})).slice(0, 3)
          })

          this.serialService.getSimilarTv(id).subscribe(data=>{
            this.similar = data.map(a => ({...a, poster_path: `http://image.tmdb.org/t/p/w500/${a.poster_path}`}))
            console.log(data)
          })

          this.serialService.getReviews(id).subscribe(data=>{
            this.reviews=data
            console.log(data)
          })
        }),
        tap(id => (this.id = +id)),
        switchMap(id => this.serialService.getDetailTv(id)))
      .subscribe(data => {
        this.tv = data
        console.log(data)
      })
  }

}
