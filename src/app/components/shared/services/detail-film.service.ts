import { Injectable } from '@angular/core';
import {map, Observable, Subject, switchMap, tap} from 'rxjs';
import {IDetail} from "../model/detail";
import {HttpClient} from "@angular/common/http";
import {Similar, SimilarResults} from "../model/similar";


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


}
