import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class RedirectService {
  constructor() {}

  redirect() {
    //window.open('http://www.mmajamaa.fi', '_blank');
  }

  openIg() {
    window.open("https://www.instagram.com/annesusanna_", "_blank");
  }
}
