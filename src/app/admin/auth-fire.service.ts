import {Injectable} from '@angular/core';

import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {catchError, Subject, tap, throwError} from "rxjs";
import {IFbAuthResponse, User} from "./model/firebase";


@Injectable({
  providedIn: 'root'
})
export class AuthFireService {

  readonly url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword'
  apiKey = "AIzaSyBZYxW5Pz0VXpYRhuT62UDlCxQzU7vDVpM"

  public error$ = new Subject<string>()
  public alert$=new Subject<string>()


  constructor(private http: HttpClient) {
  }

  login(user: User) {
    user.returnSecureToken = true
    return this.http.post<IFbAuthResponse>(this.url, user, {params: {key: this.apiKey}}).pipe(
      tap(el => AuthFireService.setToken(el)),
      catchError(this.handleError.bind(this))
    )
  }

  logout() {
    AuthFireService.setToken(null)
  }

  isAuthenticated(): boolean {
    return !!this.token
  }

  get token(): string | null {
    const expToken = localStorage.getItem('fb-token-exp')
    if (expToken) {
      const expDate = new Date(expToken)
      if (new Date() > expDate) {
        this.logout()
        return null
      }
    }
    return localStorage.getItem('fb-token')
  }

  static setToken(response: IFbAuthResponse | null) {
    if (response) {
      const timeNow = new Date().getTime()
      const expDate = new Date(timeNow + +response.expiresIn * 1000)
      localStorage.setItem('fb-token', response.idToken)
      localStorage.setItem('fb-token-exp', expDate.toString())
      console.log('setToken', expDate)
    } else {
      localStorage.clear()
    }
  }

  private handleError(error: HttpErrorResponse) {
    const {message} = error.error.error

    switch (message) {
      case 'INVALID_EMAIL':
        this.error$.next('Invalid Email')
        break
      case 'INVALID_PASSWORD':
        this.error$.next('Invalid Password')
        break
      case 'EMAIL_NOT_FOUND':
        this.error$.next('Email not found')
        break
    }

    if (message) {
      console.log(message)
    }
    return throwError(error)
  }


}
