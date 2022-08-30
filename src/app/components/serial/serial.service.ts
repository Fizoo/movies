import {Injectable} from '@angular/core';
import {BehaviorSubject, map, Observable, switchMap} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {RootTv, RootTvResults} from "./model/root";
import {DetailTV} from "./model/detail";
import {SimilarTV, SimilarTVResults} from "./model/similar";
import {ReviewTV, ReviewTVResults} from "./model/review";
import {CreditsTV} from "./model/credits";
import {VideoTv, VideoTvResults} from "./model/video";

@Injectable({
  providedIn: 'root'
})
export class SerialService {

  readonly api_key = {api_key: 'fa87a63435c07bb94de0c84dd44fd194'}

  readonly baseUrl = 'https://api.themoviedb.org/3/'

  public paramsTV$ = new BehaviorSubject({})

  private _serialList$ = new BehaviorSubject<RootTvResults[]>([])

  readonly serialList$=this._serialList$.asObservable()

  readonly serialTempList$=new BehaviorSubject<RootTvResults[]>([])

  constructor(private http:HttpClient) {
    this.paramsTV$.pipe(
      switchMap(el=> this.getTv(el)),
    ).subscribe(data=>
      this._serialList$.next(data)
    )
  }

  getTv(params={}):Observable<RootTvResults[]>{
    params={...params,...this.api_key}

    return this.http.get<RootTv>(`${this.baseUrl}tv/popular`,{params})
      .pipe(map((el:RootTv) => {
      return  el.results
    }))
  }

  getDetailTv(id:number):Observable<DetailTV>{
    return this.http.get<DetailTV>(`${this.baseUrl}tv/${id}`,{params: this.api_key})
  }

  getSimilarTv(id: number): Observable<SimilarTVResults[]> {
    return this.http.get<SimilarTV>(`${this.baseUrl}tv/${id}/similar`, {params: this.api_key}).pipe(
      map((el: SimilarTV) => el.results)
    )
  }

  getReviews(id: number): Observable<ReviewTVResults[]> {
    return this.http.get<ReviewTV>(`${this.baseUrl}tv/${id}/reviews`, {params: this.api_key})
      .pipe(map((el: ReviewTV) => {
        return  el.results
      }))
  }

  getMovieCredits(id: number): Observable<CreditsTV> {
    return this.http.get<CreditsTV>(`${this.baseUrl}tv/${id}/credits`, {params: this.api_key})
  }

  getMovieVideo(id: number): Observable<VideoTvResults[]> {
    return this.http.get<VideoTv>(`${this.baseUrl}tv/${id}/videos`, {params: this.api_key})
      .pipe(map((el: VideoTv) => {
      return  el.results
    }))
  }

  addParams(page:number){
    let oldParams=this.paramsTV$.getValue()
    let newParams={...oldParams,page}
    return this.paramsTV$.next(newParams)
  }





}
