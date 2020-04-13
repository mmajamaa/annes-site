import { Component, OnInit, HostListener, OnDestroy } from "@angular/core";
import { TranslationsService } from "../../services/translations.service";
import { Image } from "../../interfaces/image";
import { Router, NavigationStart } from "@angular/router";

// services
import { ImagesService } from "../../services/images.service";
import { Subscription } from 'rxjs';

@Component({
  selector: "app-gallery",
  templateUrl: "./gallery.component.html",
  styleUrls: ["./gallery.component.css"]
})
export class GalleryComponent implements OnInit, OnDestroy {
  public I18n: any;
  public gallerys: any;

  public images = [{ url: "../../assets/fi.png", alt_fi: "fin" }];;
  public images2: Image[] = [];
  public language: string;
  private imageSubscription: Subscription;
  private I18nSubscription: Subscription;
  private langSubscription: Subscription;

  constructor(
    private translationsService: TranslationsService,
    private router: Router,
    private imagesService: ImagesService
  ) {}

  ngOnInit() {
    this.I18nSubscription = this.translationsService.I18n.subscribe(res => {this.I18n = res});
    
    this.imagesService.getImages();
    this.imageSubscription = this.imagesService.imagesChange.subscribe((images: Image[]) => {
      this.images2 = images;
    });

    this.langSubscription = this.translationsService.lang.subscribe(r => {this.language = r});
  }

  ngOnDestroy() {
    this.I18nSubscription.unsubscribe();
    this.imageSubscription.unsubscribe();
    this.langSubscription.unsubscribe();
  }
}
