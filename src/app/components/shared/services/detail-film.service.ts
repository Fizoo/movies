import { Injectable } from '@angular/core';
import {map, Observable, Subject, switchMap, tap} from 'rxjs';
import {IDetail} from "../model/detail";
import {HttpClient} from "@angular/common/http";
import {Similar, SimilarResults} from "../model/similar";
import {Review, ReviewResults} from "../model/review";
import {Credits} from "../model/credits";
import {Video} from "../model/video";


@Injectable({
  providedIn: 'root'
})
export class DetailFilmService {

  readonly baseUrl = 'https://api.themoviedb.org/3/'
  readonly api_key = {api_key: 'fa87a63435c07bb94de0c84dd44fd194'}

  public film$=new Subject<IDetail>();
  public filmId$=new Subject<number>();

  constructor(private http: HttpClient) {
    this.filmId$.pipe(
      tap(),
      switchMap(id=>this.getDetailFilm(id)),
      tap(data=>this.film$.next(data)),
      tap(el=>console.log(el))
    ).subscribe()
  }

  getDetailFilm(id: number): Observable<IDetail> {
    return this.http.get<IDetail>(`${this.baseUrl}movie/${id}`, {params: this.api_key})
  }

  getSimilarMovie(id: number): Observable<SimilarResults[]> {
    return this.http.get<Similar>(`${this.baseUrl}movie/${id}/similar`, {params: this.api_key}).pipe(
      map((el: Similar) => el.results)
    )
  }

  getReviews(id: number): Observable<ReviewResults[]> {
    return this.http.get<Review>(`${this.baseUrl}movie/${id}/reviews`, {params: this.api_key})
      .pipe(map((el: Review) => {
       return  el.results
      }))
  }

  getMovieCredits(id: number): Observable<Credits> {
    return this.http.get<Credits>(`${this.baseUrl}movie/${id}/credits`, {params: this.api_key})
  }

  getMovieVideo(id: number): Observable<Video> {
    return this.http.get<Video>(`${this.baseUrl}movie/${id}/videos`, {params: this.api_key})
  }



}
