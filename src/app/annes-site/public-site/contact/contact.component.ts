import { Component, OnInit } from "@angular/core";

import { takeUntil } from "rxjs/operators";

import { TranslationsService } from "../translations.service";
import { RedirectService } from "../redirect.service";
import { BaseComponent } from "../../core/base/base.component";

@Component({
  "selector": "app-contact",
  "templateUrl": "./contact.component.html",
  "styleUrls": ["./contact.component.css"],
})
export class ContactComponent extends BaseComponent implements OnInit {
  public I18n: any;

  public constructor(
    private translationsService: TranslationsService,
    private redirectService: RedirectService
  ) {
    super();
  }

  public ngOnInit(): void {
    this.translationsService.I18n.pipe(takeUntil(this.ngUnsubscribe)).subscribe(
      (r) => {
        this.I18n = r;
      }
    );
  }

  public openIg(): void {
    this.redirectService.openIg();
  }

  public mail(): void {
    window.location.href = "mailto:anne";
  }
}
