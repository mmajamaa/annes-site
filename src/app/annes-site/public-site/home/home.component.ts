import { Component, OnInit, OnDestroy } from "@angular/core";

import { takeUntil } from "rxjs/operators";

import { TranslationsService } from "../translations.service";
import { BaseComponent } from "../../core/base/base.component";
import * as vars from "../../../data/variables";

@Component({
  "selector": "app-home",
  "templateUrl": "./home.component.html",
  "styleUrls": ["./home.component.css"],
})
export class HomeComponent extends BaseComponent implements OnInit, OnDestroy {
  public I18n: any;
  public vars = vars;

  public constructor(private translationsService: TranslationsService) {
    super();
  }

  public ngOnInit(): void {
    this.translationsService.I18n.pipe(takeUntil(this.ngUnsubscribe)).subscribe(
      (r) => {
        this.I18n = r;
      }
    );
  }
}
