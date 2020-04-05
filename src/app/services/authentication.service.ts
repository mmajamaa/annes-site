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

  autoLogin() {
    const UserData = {token: localStorage.getItem('token')};

    if (!UserData) {
      return
    }

    const loadedUser = new User(UserData.token);

    this.http.get('api/auth/status', {
      observe: 'body',
      params: new HttpParams().append("token", loadedUser.token),
    }).subscribe(res => {
      this.user.next(loadedUser);
      if (this.router.url == '/login') {
        this.router.navigate(['/admin'])}
    }, error => {
      console.log(error.message)
    })
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
}
