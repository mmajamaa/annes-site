import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { environment } from "src/environments/environment";

import { BehaviorSubject, Observable } from "rxjs";

import { AuthenticationResponseData } from "./login/authentication-response-data";
import { User } from "./user";

@Injectable({
  "providedIn": "root",
})
export class AuthenticationService {
  public loggedInStatus: boolean = false;
  // TODO: move to store
  public loggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  );

  public constructor(private http: HttpClient) {}

  public login(
    username: string,
    password: string
  ): Observable<AuthenticationResponseData> {
    return this.http.post<AuthenticationResponseData>(
      `${environment.baseUrl}/api/auth/login`,
      {
        username,
        password,
      }
    );
  }

  // TODO: move logic to effects
  public authStatus(): Observable<AuthenticationResponseData> {
    const userData: User = JSON.parse(localStorage.getItem("user"));

    let loadedUser: User = new User(null, null);

    if (userData) {
      loadedUser = new User(userData.username, userData.token);
      this.loggedIn.next(true);
    }

    return this.http.get<AuthenticationResponseData>(
      `${environment.baseUrl}/api/auth/status`,
      {
        "observe": "body",
        "params": new HttpParams().append("token", loadedUser.token),
      }
    );
  }
}
