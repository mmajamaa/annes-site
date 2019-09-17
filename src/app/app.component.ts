import { Component } from "@angular/core";
import { TranslationsService } from './services/translations.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  title = "anne";

  public I18n = {};

  constructor(private translationsService: TranslationsService,
              private activatedRoute: ActivatedRoute) {

                // todo: activate tab (and subtab) links on page load
                console.log(activatedRoute.snapshot.url)

              }

  ngOnInit() {
    this.translationsService.cast.subscribe(r => this.I18n = r);
  }
}
