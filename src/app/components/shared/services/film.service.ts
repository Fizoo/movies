import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, filter, map, Observable, Subject, switchMap, tap} from "rxjs";
import {IResponse, RootObject} from "../model/model";

interface SearchParams {
  query?:string
  page?:number
  api_key:string
}

@Injectable({
  providedIn: 'root'
})
export class FilmService {


  readonly api_key = {api_key: 'fa87a63435c07bb94de0c84dd44fd194'}

  readonly baseUrl = 'https://api.themoviedb.org/3/'

  public params$ = new BehaviorSubject({})

  public page$ = new Subject<number>()

  public paramsSearch$ = new BehaviorSubject<SearchParams|{}>({})

  public filmList$ = new BehaviorSubject<RootObject[]>([])

  public tempList$ = new BehaviorSubject<RootObject[]>([])


  constructor(private http: HttpClient) {
    this.params$.pipe(
      tap(() => {}),
      switchMap(params => {
       return  this.getFilm(params)
      }),
      tap(data => this.filmList$.next(data))
    ).subscribe()

    this.paramsSearch$.pipe(
      tap(),
      filter((el:any)=>!!el.query),
      switchMap(params=>{
        return this.searchMovie(params)
      })
    ).subscribe(data => this.filmList$.next(data))
  }

  getFilm(params = {}): Observable<RootObject[]> {
    params = {...params, api_key: 'fa87a63435c07bb94de0c84dd44fd194'}
    return this.http.get<IResponse>(`${this.baseUrl}discover/movie`, {params}).pipe(
      tap(data=> this.page$.next(data.total_pages)),
      map((el: IResponse) => el.results),
    )
  }

  searchMovie(params={}): Observable<RootObject[]> {
    params = {...params, api_key: 'fa87a63435c07bb94de0c84dd44fd194'}
    return this.http.get<IResponse>(`${this.baseUrl}search/multi`, {params}).pipe(
      tap(data=>this.page$.next(data.total_pages)),
      map((el: IResponse) => el.results),
      tap(el => this.filmList$.next(el))
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

  addParams(value= {}) {
    const oldParams = this.params$.getValue()
    if(!!oldParams) {
      return this.params$.next({...oldParams, ...value})
    }
  }

  resetParams(){
    return this.params$.next({})
  }

  addSearchParams(value= {}) {
    const oldParams = this.paramsSearch$.getValue()
    return this.paramsSearch$.next({...oldParams, ...value})
  }
  resetSearchParams(){
    return this.paramsSearch$.next({})
  }




}
