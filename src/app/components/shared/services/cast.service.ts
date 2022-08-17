import {Injectable} from '@angular/core';
import {map, Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {Actor} from "../model/actor";
import {ActorFilms, ActorFilmsCast} from "../model/actorFilms";

@Injectable({
  providedIn: 'root'
})
export class CastService {

  readonly api_key = {api_key: 'fa87a63435c07bb94de0c84dd44fd194'}

  readonly baseUrl = 'https://api.themoviedb.org/3/'

  constructor(private http:HttpClient) { }

  getActor(id:number): Observable<Actor> {
    return this.http.get<Actor>(`${this.baseUrl}person/${id}`, {params:this.api_key})
  }
  getMovieActor(id:number): Observable<ActorFilmsCast[]>{
    return this.http.get<ActorFilms>(`${this.baseUrl}person/${id}/movie_credits`, {params:this.api_key}).pipe(
      map(el=>el.cast),
    )
  }
}
