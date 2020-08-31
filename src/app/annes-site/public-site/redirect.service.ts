// TODO: Remove this service?
import { Injectable } from "@angular/core";
import { instagramLink } from "../../data/variables";

@Injectable({
  "providedIn": "root",
})
export class RedirectService {
  public openIg(): void {
    window.open(instagramLink, "_blank");
  }
}
