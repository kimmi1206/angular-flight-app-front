import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { AuthentificationService } from './services/authentification.service';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { isNullOrUndefined } from 'util';

@Injectable()
export class AuthentificationInterceptor implements HttpInterceptor {

  constructor(private readonly authService: AuthentificationService, private readonly router: Router) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (this.authService.getJwtToken()) {
      request = this.addToken(request, this.authService.getJwtToken());
    }
    return next.handle(request).pipe(
      catchError(err => {     
        console.log(err.error.trace);
        if (isNullOrUndefined(err.error.message)) {
          this.authService.doLogoutUser();
          this.router.navigate(['/authentification/login']);
        }
         else if(err.error.status===403){
          if (!isNullOrUndefined(err.error.trace)) {
            if ((err.error.trace).includes('DisabledException')) {
              this.authService.disabledException = true;
            }
          }
          this.router.navigate(['/authentification/login']);
        } 
        else if ((err.error.message).includes('U_USERNAME')||(err.error.message).includes('U_EMAIL')) {
          this.router.navigate(['/authentification/register']);
        }
        else {
          this.router.navigate(['/exception']);
        }
        const error = err.error.message || err.statusText;
        return throwError(error);
      }))
  }
  addToken(request: HttpRequest<any>, token: string) {
    return request.clone({
      setHeaders: {
        'Authorization': `Bearer ${token}`
      }
    });
  }
}
