import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, map, Observable, switchMap, tap} from "rxjs";
import {IResponse, RootObject} from "../model/model";
import {Region, RegionResults} from "../model/region";


@Injectable({
  providedIn: 'root'
})
export class FilmService {


  readonly api_key = {api_key: 'fa87a63435c07bb94de0c84dd44fd194'}

  readonly baseUrl = 'https://api.themoviedb.org/3/'

  public params$ = new BehaviorSubject({})

  public paramsSearch$ = new BehaviorSubject({})

  public filmList$ = new BehaviorSubject<RootObject[]>([])


  constructor(private http: HttpClient) {
    this.params$.pipe(
      tap(() => {
      }),
      switchMap(params => this.getFilm(params)),
      tap(data => this.filmList$.next(data))
    ).subscribe()
  }

  getFilm(params = {}): Observable<RootObject[]> {
    params = {...params, api_key: 'fa87a63435c07bb94de0c84dd44fd194'}
    return this.http.get<IResponse>(`${this.baseUrl}discover/movie`, {params}).pipe(
      map((el: IResponse) => el.results),
    //  tap(el => console.log(el))
    )
  }

  searchMovie(search: string): Observable<RootObject[]> {
    let param = this.api_key
    let changeUrl: string
    if (search.length > 0) {
      changeUrl = 'search/movie'
      param = {...param, ...{query: search}}
    } else {
      changeUrl = 'discover/movie'
    }
    return this.http.get<IResponse>(`${this.baseUrl}${changeUrl}`, {params: param}).pipe(
      map((el: IResponse) => el.results),
      tap(el => this.filmList$.next(el))
    )
  }

  getRegions():Observable<RegionResults[]>{
      return this.http.get<Region>(`${this.baseUrl}watch/providers/regions`,{params: this.api_key}).pipe(
      map((el: Region) => el.results)
    )
  }

  getPopularFilms(): Observable<RootObject[]> {
    return this.http.get<IResponse>(`${this.baseUrl}movie/popular`, {params: this.api_key}).pipe(
      map((el: IResponse) => el.results)
    )
  }

  getLatestFilms(): Observable<RootObject[]> {
    return this.http.get<IResponse>(`${this.baseUrl}movie/latest`, {params: this.api_key}).pipe(
      map((el) => el.results)
    )
  }

  getTopRated(): Observable<RootObject[]> {
    return this.http.get<IResponse>(`${this.baseUrl}movie/popular}`, {params: this.api_key}).pipe(
      map((el: IResponse) => el.results)
    )
  }

  addParams(value: any) {
    const oldParams = this.params$.getValue()
    if(!!oldParams) {
      return this.params$.next({...oldParams, ...value})
    }
  }

  addSearchParams(value: any) {
    const oldParams = this.paramsSearch$.getValue()
    return this.params$.next({...oldParams, ...value})
  }




}
