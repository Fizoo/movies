import {Injectable} from '@angular/core';
import {BehaviorSubject, map, Observable} from "rxjs";
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

  private _serialList$ = new BehaviorSubject<RootTv[]>([])

  readonly serialList$=this._serialList$.asObservable()

  constructor(private http:HttpClient) {

  }

  getTv():Observable<RootTvResults[]>{
    return this.http.get<RootTv>(`${this.baseUrl}tv/popular`,{params: this.api_key})
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





}
