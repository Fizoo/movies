import {Injectable} from '@angular/core';

import {HttpClient} from "@angular/common/http";
import {map, Observable} from "rxjs";
import {RootObject} from "../model/model";
import {Credits} from "../model/credits";
import {Video} from "../model/video";

interface IResponse {
  page: number
  results: RootObject[]
  total_pages: number
  total_results: number

}

@Injectable({
  providedIn: 'root'
})
export class FilmService {

  valueUrl: string = 'movie/popular'

  readonly apikey = '?api_key=fa87a63435c07bb94de0c84dd44fd194'
  readonly baseUrl = 'https://api.themoviedb.org/3/'
  readonly url = `${this.baseUrl}${this.valueUrl}${this.apikey}`

  constructor(private http: HttpClient) {
  }

  getFilm(): Observable<RootObject[]> {
    this.valueUrl = 'discover/movie'
    return this.http.get<IResponse>(this.url).pipe(
      map((el: IResponse) => el.results)
    )
  }

  getPopularFilms(): Observable<RootObject[]> {
    this.valueUrl = 'movie/popular'
    return this.http.get<IResponse>(this.url).pipe(
      map((el: IResponse) => el.results)
    )
  }

  getTopRated(): Observable<RootObject[]> {
    return this.http.get<IResponse>(`${this.url}movie/top_rated${this.apikey}`).pipe(
      map((el: IResponse) => el.results)
    )
  }

  getDetailFilm(id: number) {
   /* this.valueUrl = 'movie/' + String(id)
    return this.http.get(this.url)*/

    return this.http.get(`${this.baseUrl}movie/${id}${this.apikey}`)
  }

  getMovieCredits(id:number):Observable<Credits>{
    return this.http.get<Credits>(`${this.baseUrl}movie/${id}/credits${this.apikey}`)
  }

  getMovieVideo(id:number):Observable<Video>{
    return this.http.get<Video>(`${this.baseUrl}movie/${id}/videos${this.apikey}`)
  }
}
