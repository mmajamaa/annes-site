import { Injectable } from "@angular/core";
import { instagramLink } from '../data/variables';

@Injectable({
  providedIn: "root"
})
export class RedirectService {
  private instagramLink: string = instagramLink;

  constructor() {}
  
  openIg() {
    window.open(instagramLink, '_blank');
  }
}