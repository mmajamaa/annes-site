import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse, HttpParams } from "@angular/common/http";
import { catchError, tap } from 'rxjs/operators';
import { throwError, BehaviorSubject } from 'rxjs';

import { AuthenticationResponseData } from '../interfaces/authentication-response-data';
import { User } from '../models/user';
import { Router,  } from '@angular/router';

@Injectable({
  providedIn: "root"
})
export class AuthenticationService {
  public loggedInStatus = false;
  user = new BehaviorSubject<User>(null);

  constructor(private http: HttpClient, private router: Router) {}

  login(username, password) {
    return this.http.post<AuthenticationResponseData>("/api/auth/login",
    {
      username,
      password
    }
    )
    .pipe(
      catchError(this.handleError),
      tap(data => {
        this.handleAuthentication(data);
      })
    );
  }

  handleError(errorRes: HttpErrorResponse) {
    return throwError(errorRes.error.message);
  }

  handleAuthentication(data) {
    const token = data.token;
    localStorage.setItem('token', token.toString());
    const user = new User(token);
    this.user.next(user);
  }

  authStatus() {
    const UserData = {token: localStorage.getItem('token')};

    const loadedUser = new User(UserData.token);

    return this.http.get<AuthenticationResponseData>('api/auth/status', {
      observe: 'body',
      params: new HttpParams().append("token", loadedUser.token),
    })}
}
