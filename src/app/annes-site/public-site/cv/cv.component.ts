import { Component, OnInit } from "@angular/core";

import { Subscription } from "rxjs";
import { takeUntil } from "rxjs/operators";

import { TranslationsService } from "../translations.service";
import { BaseComponent } from "../../core/base/base.component";

@Component({
  "selector": "app-cv",
  "templateUrl": "./cv.component.html",
  "styleUrls": ["./cv.component.css"],
})
export class CvComponent extends BaseComponent implements OnInit {
  public I18n: any;
  public language: string;
  private I18nSubscription: Subscription;
  private langSubscription: Subscription;

  public constructor(private translationsService: TranslationsService) {
    super();
  }

  public ngOnInit(): void {
    this.translationsService.I18n.pipe(takeUntil(this.ngUnsubscribe)).subscribe(
      (r) => {
        this.I18n = r;
      }
    );

    this.translationsService.lang
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((r) => {
        this.language = r;
      });
  }
}
