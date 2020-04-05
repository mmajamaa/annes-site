import { Component } from "@angular/core";
import { TranslationsService } from "./services/translations.service";
import { ActivatedRoute } from "@angular/router";
import { GeneralHttpService } from "./services/general-http.service";
import { AuthenticationService } from "./services/authentication.service";

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
    private activatedRoute: ActivatedRoute,
    private generalHttpService: GeneralHttpService,
    private authenticationService: AuthenticationService
  ) {
    // todo: activate tab (and subtab) links on page load
    //console.log(activatedRoute.snapshot.url);
  }

  ngOnInit() {
    this.translationsService.cast.subscribe(r => (this.I18n = r));
    this.generalHttpService.pageLoad().subscribe();
    this.authenticationService.autoLogin();
  }
}
