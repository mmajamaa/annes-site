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
  public loggedInStatus = true;

  constructor(private http: HttpClient) { }

  get isLoggedIn() {
    return this.loggedInStatus;
  }

  getUserDetails(username, password) {
    return this.http.post('/api/login', {
      username,
      password
    }).subscribe(data => {
      console.log(data, " is what we got from the server");
    });
  }
}
