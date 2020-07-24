import { Component } from "@angular/core";
import { TranslationsService } from "./components/public/translations.service";
import { GeneralHttpService } from "./components/public/general-http.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  public title = "Taiteilija Anne Puronmaa";
  public I18n = {};

  constructor(
    private translationsService: TranslationsService,
    private generalHttpService: GeneralHttpService,
  ) { }

  ngOnInit() {
    this.translationsService.I18n.subscribe(r => { this.I18n = r });
    this.generalHttpService.pageLoad().subscribe();
  }
}
