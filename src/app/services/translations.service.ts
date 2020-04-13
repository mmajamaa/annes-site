import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { of, BehaviorSubject, Observable } from "rxjs";
import * as I18n from '../data/I18n';

@Injectable({
  providedIn: "root"
})
export class TranslationsService {
  public I18n = new BehaviorSubject<any>(I18n.fi);
  public language = "fi";
  public lang = new BehaviorSubject<any>(this.language);

  constructor(private http: HttpClient) { }

  toggleLanguage() {
    this.I18n.next(this.language == "fi" ? I18n.en : I18n.fi);
    this.language = this.language == "fi" ? "en" : "fi";
    this.lang.next(this.language);
  }

  getLanguage() {
    return this.language;
  }
}
