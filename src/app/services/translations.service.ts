import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TranslationsService {

  private data = {};
  private translation = new BehaviorSubject<any>({
    home: "ETUSIVU",
    cv: "CV",
    gallery: "GALLERIA",
    contact: "YHTEYSTIEDOT",
    phone: "Puhelinnumero",
    implementation: "Toteutus",
    email: "Sähköposti",
    some: "Sosiaalinen media"
    });
  cast = this.translation.asObservable();

  public url = "http://localhost:4201";
  public textContent = {};
  public language = "fi";
  public I18n = {};

  constructor(private http: HttpClient) {
    this.data = {
    fi: {
      home: "ETUSIVU",
      cv: "CV",
      gallery: "GALLERIA",
      contact: "YHTEYSTIEDOT",
      phone: "Puhelinnumero",
      implementation: "Toteutus",
      email: "Sähköposti",
      some: "Sosiaalinen media"
      },
    en: {
      home: "HOME",
      cv: "CV",
      gallery: "GALLERY",
      contact: "CONTACT",
      phone: "Phone number",
      implementation: "Implementation",
      email: "Email",
      some: "Social media"
      }
    }
  }


  toggleLanguage() {
    this.translation.next(this.language == "fi" ? this.data.en : this.data.fi);
    this.language = this.language == "fi" ? "en" : "fi";
  }

  getTranslations() : Observable<any[]> {
    return this.http.get<any[]>(this.url).subscribe(res => {
      this.textContent = res;
      this.I18n = res["fi"];
      console.log(res)
    });
  }

}
