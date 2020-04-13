import { Component, OnInit, OnDestroy } from "@angular/core";
import { TranslationsService } from "../../services/translations.service";
import { Subscription } from 'rxjs';

@Component({
  selector: "app-cv",
  templateUrl: "./cv.component.html",
  styleUrls: ["./cv.component.css"]
})
export class CvComponent implements OnInit, OnDestroy {
  public I18n: any;
  public language: string;
  private I18nSubscription: Subscription;
  private langSubscription: Subscription;

  constructor(private translationsService: TranslationsService) {}

  ngOnInit() {
    this.I18nSubscription = this.translationsService.I18n.subscribe(r => {this.I18n = r});
    this.langSubscription = this.translationsService.lang.subscribe(r => {this.language = r});
  }

  ngOnDestroy() {
    this.I18nSubscription.unsubscribe();
    this.langSubscription.unsubscribe();
  }
}
