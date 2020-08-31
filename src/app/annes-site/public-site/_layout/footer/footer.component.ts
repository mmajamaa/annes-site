import { Component, OnInit, Inject } from "@angular/core";

import { takeUntil } from "rxjs/operators";

import { TranslationsService } from "../../translations.service";
import { RedirectService } from "../../redirect.service";
import { mainEmail, devEmail } from "../../../../data/variables";
import { BaseComponent } from "src/app/annes-site/core/base/base.component";

@Component({
  "selector": "app-footer",
  "templateUrl": "./footer.component.html",
  "styleUrls": ["./footer.component.css"],
})
export class FooterComponent extends BaseComponent implements OnInit {
  public I18n: any;
  public url: string;
  public mainEmail: string = mainEmail;
  public devEmail: string = devEmail;

  public constructor(
    private translationsService: TranslationsService,
    private redirectService: RedirectService,
    @Inject(Window) private window: Window
  ) {
    super();
  }

  public ngOnInit(): void {
    this.translationsService.I18n.pipe(takeUntil(this.ngUnsubscribe)).subscribe(
      (r) => {
        this.I18n = r;
      }
    );
    this.url = this.window.location.hostname;
  }

  public openIg(): void {
    this.redirectService.openIg();
  }
}
