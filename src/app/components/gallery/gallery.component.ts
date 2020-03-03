import { Component, OnInit, HostListener } from "@angular/core";
import { TranslationsService } from "../../services/translations.service";
import { Image } from "../../interfaces/image";
import { Router, NavigationStart } from "@angular/router";
import { SubGalleryComponent } from "../sub-gallery/sub-gallery.component";

// services
import { ImagesService } from "../../services/images.service";

@Component({
  selector: "app-gallery",
  templateUrl: "./gallery.component.html",
  styleUrls: ["./gallery.component.css"]
})
export class GalleryComponent implements OnInit {
  public I18n: any;
  public gallerys: any;

  public images: Image[];
  public images2: Image[] = [];
  public language: string;

  constructor(
    private translationsService: TranslationsService,
    private router: Router,
    private imagesService: ImagesService
  ) {}

  ngOnInit() {
    this.translationsService.cast.subscribe(res => (this.I18n = res));

    //this.imagesService.getGallerys().subscribe(res => {
    //  this.gallerys = res;
    //console.log(res);
    //});

    this.images = [{ url: "../../assets/fi.png", alt_fi: "fin" }];

    this.imagesService.getImages().subscribe(res => {
      this.images2 = res;
    });

    this.translationsService.languageCast.subscribe(r => (this.language = r));
  }

  @HostListener("click", ["$event.target"]) clickInside(e) {
    if (e.className == "sub-router-link") {
      Array.from(document.getElementsByClassName("sub-router-link")).forEach(
        r => {
          r.className = "sub-router-link";
        }
      );
      e.className += " active";
    }
  }
}
