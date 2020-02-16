import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class RedirectService {
  constructor() {}

  redirect() {
    //window.open('http://www.mmajamaa.fi', '_blank');
    window.location = "mailto:mikko.majamaa@outlook.com";
  }

  openIg() {
    window.open("https://www.instagram.com", "_blank");
  }
}
