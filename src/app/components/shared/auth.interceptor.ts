import {Injectable} from '@angular/core';
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {catchError, Observable, throwError} from 'rxjs';
import {AuthFireService} from "../../admin/service/auth-fire.service";
import {Router} from '@angular/router';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private auth: AuthFireService,
              private router:Router
              ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
     request=request.clone({
       setParams:{
         auth:this.auth.token as string
       }
     })

    return next.handle(request).pipe(
      catchError( (error: HttpErrorResponse)=> {
        this.auth.error$.next(error.error.error.message)
        console.log('error',error.error.error.message)
        if (error.status===401){
          this.auth.logout()
          this.router.navigate(['/admin','login'],
            {
              queryParams:{
                authFailed:true
              }
            })
        }
          return throwError(() => new Error(error.message));
        }
      )
    )
  }
}
