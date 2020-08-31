import { Component, OnInit } from "@angular/core";

import { takeUntil } from "rxjs/operators";

import { TranslationsService } from "../../translations.service";
import { BaseComponent } from "../../../core/base/base.component";
import { FlagIcon } from "../../../shared/flag-icon/flag-icon";

@Component({
  "selector": "app-navbar",
  "templateUrl": "./navbar.component.html",
  "styleUrls": ["./navbar.component.css"],
})
export class NavbarComponent extends BaseComponent implements OnInit {
  public I18n: any;
  public images: FlagIcon[] = [
    { src: "./assets/uk.png", alt: "uk" },
    { src: "./assets/fi.png", alt: "fi" },
  ];
  public image: FlagIcon = this.images[0];
  public open: boolean = false;
  public myClass: string = "topnav";
  public currentRoute: string;

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

  public toggleLanguage(): void {
    this.translationsService.toggleLanguage();
    this.image =
      this.image === this.images[0] ? this.images[1] : this.images[0];
  }

  public toggleNavbar(): void {
    this.open = this.open === true ? false : true;
    this.myClass = this.myClass === "topnav" ? "topnav responsive" : "topnav";
  }
}
