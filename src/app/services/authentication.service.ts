import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from "@angular/common/http";

interface myData {
  success: boolean;
  message: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  public loggedInStatus = false;

  constructor(private http: HttpClient) {
    this.http.get('api/authenticated', {
      observe: 'body',
      params: new HttpParams().append('token', localStorage.getItem('token'))
    }).subscribe(
      data => (this.loggedInStatus = true, console.log('auth ' + this.loggedInStatus)),
      error => this.loggedInStatus = false
    )
  }

  get isLoggedIn() {
    console.log(this.loggedInStatus)
    return this.loggedInStatus;
  }

  setLoggedIn(value: boolean) {
    this.loggedInStatus = value;
  }

  getUserName() {
    return this.http.get('api/username', {
      observe: 'body',
      params: new HttpParams().append('token', localStorage.getItem('token'))
    })
  }

  getUserDetails(username, password) {
    return this.http.post<myData>('/api/login', {
      username,
      password
    });
  }
}
