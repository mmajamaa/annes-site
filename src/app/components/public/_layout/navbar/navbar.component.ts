import { Component, OnInit, OnDestroy } from "@angular/core";
import { TranslationsService } from "../../translations.service";
import { Subscription } from 'rxjs';

@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.css"]
})
export class NavbarComponent implements OnInit, OnDestroy {
  public I18n: any;
  public images = [
    { src: "./assets/uk.png", alt: "uk" },
    { src: "./assets/fi.png", alt: "fi" }
  ];
  public image = this.images[0];
  public open: boolean = false;
  public myClass = "topnav";
  public currentRoute: string;
  private I18nSubscription: Subscription;

  constructor(
    private translationsService: TranslationsService
  ) { }

  ngOnInit() {
    this.I18nSubscription = this.translationsService.I18n.subscribe(r => { this.I18n = r });
  }

  toggleLanguage() {
    this.translationsService.toggleLanguage();
    this.image = this.image == this.images[0] ? this.images[1] : this.images[0];
  }

  toggleNavbar() {
    this.open = this.open === true ? false : true;
    this.myClass = this.myClass === "topnav" ? "topnav responsive" : "topnav";
  }

  ngOnDestroy() {
    this.I18nSubscription.unsubscribe();
  }
}
