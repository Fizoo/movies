import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, catchError, Observable, tap, throwError} from "rxjs";
import {RootObject} from "../../components/shared/model/model";
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  readonly url='https://movies-100ae-default-rtdb.firebaseio.com'

  public data$=new BehaviorSubject<RootObject[]>([])

  constructor(private http:HttpClient,
              private router:Router
              ) { }

  getAll():Observable<RootObject[]>{
   return  this.http.get<RootObject[]>(`${this.url}/favorite.json`).pipe(
     tap(el=> console.log(el))
    )
  }

  addFilm(film:RootObject):Observable<RootObject>{
    return  this.http.post<RootObject>(`${this.url}/favorite.json`,film).pipe(
      tap(el=> console.log(el)),
      catchError( (err) => {
        return throwError(err.error)
      })
    )
  }

  deleteFilm(){

  }


}
