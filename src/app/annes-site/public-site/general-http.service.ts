import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root"
})
export class GeneralHttpService {
  constructor(private http: HttpClient) {}

  pageLoad() {
    return this.http.post(
      "/api/page-load",
      { message: "hello back-end" },
      {
        observe: "body"
      }
    );
  }
}
