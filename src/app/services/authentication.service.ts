import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";

interface myData {
  success: boolean;
  message: string;
}

@Injectable({
  providedIn: "root"
})
export class AuthenticationService {
  public loggedInStatus = false;

  constructor(private http: HttpClient) {}

  getUserName() {
    return this.http.get("api/auth/username", {
      observe: "body",
      params: new HttpParams().append("token", localStorage.getItem("token"))
    });
  }

  getAuthStatus() {
    return this.http.get("api/auth/status", {
      observe: "body",
      params: new HttpParams().append("token", localStorage.getItem("token"))
    });
  }

  getUserDetails(username, password) {
    console.log("perkele");
    return this.http.post<myData>("/api/auth/login", {
      username,
      password
    });
  }
}
