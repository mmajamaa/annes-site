import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { of, BehaviorSubject, Observable } from "rxjs";
import * as translations from '../data/translations';

@Injectable({
  providedIn: "root"
})
export class TranslationsService {
  private data: any = {};
  private translation = new BehaviorSubject<any>(translations.fi);
  cast = this.translation.asObservable();

  public language = "fi";
  public I18n = {};
  private lang = new BehaviorSubject<any>(this.language);
  languageCast = this.lang.asObservable();

  constructor(private http: HttpClient) { }

  toggleLanguage() {
    this.translation.next(this.language == "fi" ? translations.en : translations.fi);
    this.language = this.language == "fi" ? "en" : "fi";
    this.lang.next(this.language);
  }

  getLanguage() {
    return this.language;
  }
}
