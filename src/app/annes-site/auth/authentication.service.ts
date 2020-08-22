import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { HttpClient, HttpParams } from "@angular/common/http";

import { BehaviorSubject } from "rxjs";

import { AuthenticationResponseData } from "./login/authentication-response-data";
import { User } from "./user";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class AuthenticationService {
  public loggedInStatus = false;
  public loggedIn = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient, private router: Router) {}

  login(username, password) {
    return this.http.post<AuthenticationResponseData>(
      environment.baseUrl + "/api/auth/login",
      {
        username,
        password,
      }
    );
  }

  // TODO: move logic to effects
  authStatus() {
    const userData: User = JSON.parse(localStorage.getItem("user"));

    let loadedUser = new User(null, null);

    if (userData) {
      loadedUser = new User(userData.username, userData.token);
      this.loggedIn.next(true);
    }

    return this.http.get<AuthenticationResponseData>(
      environment.baseUrl + "/api/auth/status",
      {
        observe: "body",
        params: new HttpParams().append("token", loadedUser.token),
      }
    );
  }
}
