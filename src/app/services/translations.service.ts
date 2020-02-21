import { Injectable } from "@angular/core";
import { map } from "rxjs/operators";
import { HttpClient } from "@angular/common/http";
import { of, BehaviorSubject, Observable } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class TranslationsService {
  private data: any = {};
  private translation = new BehaviorSubject<any>({
    home: "ETUSIVU",
    cv: "CV",
    gallery: "GALLERIA",
    contact: "YHTEYSTIEDOT",
    phone: "Puhelinnumero",
    implementation: "Toteutus",
    email: "Sähköposti",
    some: "Sosiaalinen media",
    cv_content: "Päivitetään pian...",
    home_content:
      "Hei! Tervetuloa kotisivuilleni. Täältä löydät taidettani sekä muuta. -Anne :)",
    gallery_content: "Täällä näet pian taidettani..."
  });
  cast = this.translation.asObservable();

  public url = "http://localhost:4201";
  public textContent = {};
  public language = "fi";
  public I18n = {};
  private lang = new BehaviorSubject<any>(this.language);
  languageCast = this.lang.asObservable();

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
        some: "Sosiaalinen media",
        cv_content: "Päivitetään pian...",
        home_content: "Päivitetään pian...",
        gallery_content: "Täällä näet pian taidettani..."
      },
      en: {
        home: "HOME",
        cv: "CV",
        gallery: "GALLERY",
        contact: "CONTACT",
        phone: "Phone",
        implementation: "Implementation",
        email: "Email",
        some: "Social media",
        cv_content:
          "Soon to be updated in English. Thank you for your patience.",
        home_content:
          "Hi! Welcome to my website. Here you can find my art and more. -Anne :)",
        gallery_content: "Here you will see my art. Soon."
      }
    };
  }

  toggleLanguage() {
    this.translation.next(this.language == "fi" ? this.data.en : this.data.fi);
    this.language = this.language == "fi" ? "en" : "fi";
    this.lang.next(this.language);
  }

  getTranslations() {
    return this.http.get<any[]>(this.url).subscribe(res => {
      this.textContent = res;
      this.I18n = res["fi"];
      console.log(res);
    });
  }

  getLanguage() {
    return this.language;
  }
}
