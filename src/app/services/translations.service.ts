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
    home_content: "Päivitetään pian..."
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
        cv_content: "Soon to be updated...",
        home_content: "Soon to be updated...",
        gallery_content: "Here you will see my art. Soon."
      }
    };
  }

  toggleLanguage() {
    this.translation.next(this.language == "fi" ? this.data.en : this.data.fi);
    this.language = this.language == "fi" ? "en" : "fi";
  }

  getTranslations() {
    return this.http.get<any[]>(this.url).subscribe(res => {
      this.textContent = res;
      this.I18n = res["fi"];
      console.log(res);
    });
  }
}
