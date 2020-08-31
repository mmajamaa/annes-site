import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { BehaviorSubject } from "rxjs";

import * as I18n from "../../data/I18n";

@Injectable({
  "providedIn": "root",
})
export class TranslationsService {
  public I18n: BehaviorSubject<any> = new BehaviorSubject<any>(I18n.fi);
  public language: string = "fi";
  public lang: BehaviorSubject<string> = new BehaviorSubject<string>(
    this.language
  );

  public constructor(private http: HttpClient) {}

  public toggleLanguage(): void {
    this.I18n.next(this.language === "fi" ? I18n.en : I18n.fi);
    this.language = this.language === "fi" ? "en" : "fi";
    this.lang.next(this.language);
  }

  public getLanguage(): string {
    return this.language;
  }
}
