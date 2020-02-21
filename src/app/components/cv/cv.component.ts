import { Component, OnInit } from "@angular/core";
import { TranslationsService } from "../../services/translations.service";

@Component({
  selector: "app-cv",
  templateUrl: "./cv.component.html",
  styleUrls: ["./cv.component.css"]
})
export class CvComponent implements OnInit {
  public I18n: any;
  public language: string;

  constructor(private translationsService: TranslationsService) {}

  ngOnInit() {
    this.translationsService.cast.subscribe(r => (this.I18n = r));
    this.translationsService.languageCast.subscribe(r => (this.language = r));
  }
}
