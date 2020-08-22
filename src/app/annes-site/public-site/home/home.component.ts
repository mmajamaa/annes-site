import { Component, OnInit, OnDestroy } from "@angular/core";
import { TranslationsService } from "../translations.service";
import { Subscription } from "rxjs";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"],
})
export class HomeComponent implements OnInit, OnDestroy {
  public I18n: any;
  private I18nSubscription: Subscription;

  constructor(private translationsService: TranslationsService) {}

  ngOnInit() {
    this.I18nSubscription = this.translationsService.I18n.subscribe((r) => {
      this.I18n = r;
    });
  }

  ngOnDestroy() {
    this.I18nSubscription.unsubscribe();
  }
}
