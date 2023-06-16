import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {catchError, Observable, throwError} from "rxjs";
import {RootObject} from "../model/model";

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  readonly url='https://movies-100ae-default-rtdb.firebaseio.com'

  constructor(private http:HttpClient,
              ) { }

  getAll():Observable<RootObject[]>{
   return  this.http.get<RootObject[]>(`${this.url}/favorite.json`)
  }

  addFilm(film:RootObject):Observable<RootObject>{
    return  this.http.post<RootObject>(`${this.url}/favorite.json`,film).pipe(
      catchError( (err) => {
        return throwError(err.error)
      })
    )
  }



}
