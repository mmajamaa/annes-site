import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

interface myData {
  success: boolean;
  message: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  public loggedInStatus = false;

  constructor(private http: HttpClient) { }

  get isLoggedIn() {
    return this.loggedInStatus;
  }

  setLoggedIn(value: boolean) {
    this.loggedInStatus = value;
  }

  getUserDetails(username, password) {
    return this.http.post('/api/login', {
      username,
      password
    });
  }
}
