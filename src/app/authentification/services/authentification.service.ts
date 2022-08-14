import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment'
import { LoginRequest } from 'src/app/shared/models/loginRequest';
import { LoginResponse } from 'src/app/shared/models/loginResponse';
import { Observable, of } from 'rxjs';
import { tap, mapTo, catchError, map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { User } from 'src/app/shared/models/user';
import { PasswordReset } from 'src/app/shared/models/password';

const headers = new HttpHeaders().set('Content-Type', 'text/plain; charset=utf-8');

@Injectable({
  providedIn: 'root'
})
export class AuthentificationService {
  loggedUser: string;
  private readonly JWT_TOKEN = 'JWT_TOKEN';
  disabledException=false;
  constructor(private http: HttpClient, private router: Router) { }

  login(loginRequest: LoginRequest): Observable<boolean> {
    return this.http.post<LoginResponse>(`${environment.apiUrl}/authenticate`, loginRequest)
      .pipe(
        tap(token => this.doLoginUser(loginRequest.username, token)
        ),
        mapTo(true),
        catchError(error => {
          return of(false);
        })
      );
  }                                  

  register(user: User) {
    return this.http.post(`${environment.apiUrl}/register`, user);
  }

  resetPassword(password:PasswordReset){
    return this.http.post(`${environment.apiUrl}/reset`, password).pipe(map((res:LoginResponse) => res.token));
  }
  
  sendEmail(email: string) {
    return this.http.get(`${environment.apiUrl}/forgotPassword?email=` + email);
  }

  confirmRegistration(token: string) {
    return this.http.get(`${environment.apiUrl}/registration-confirm?token=` + token).pipe(map((res:LoginResponse) => res.token));
  }

  doLoginUser(username: string, loginResponse: LoginResponse) {
    this.loggedUser = username;
    this.storeTokens(loginResponse);
    localStorage.setItem("loggedUser", this.loggedUser);
  }
  storeTokens(loginResponse: LoginResponse) {
    localStorage.setItem(this.JWT_TOKEN, loginResponse.token);
  }
  isLoggedIn() {
    return !!this.getJwtToken();
  }
  getJwtToken() {
    return localStorage.getItem(this.JWT_TOKEN);
  }
  doLogoutUser() {
    this.loggedUser = null;
    this.removeTokens();
  }
  removeTokens() {
    localStorage.removeItem(this.JWT_TOKEN);
  }
}
