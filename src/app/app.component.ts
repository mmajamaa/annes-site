import { Component } from "@angular/core";
import { TranslationsService } from "./services/translations.service";
import { GeneralHttpService } from "./services/general-http.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  title = "Taiteilija Anne Puronmaa";

  public I18n = {};

  constructor(
    private translationsService: TranslationsService,
    private generalHttpService: GeneralHttpService,
  ) {}

  ngOnInit() {
    this.translationsService.cast.subscribe(r => (this.I18n = r));
    this.generalHttpService.pageLoad().subscribe();
  }
}
