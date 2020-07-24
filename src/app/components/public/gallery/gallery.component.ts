import { Component, OnInit, OnDestroy } from "@angular/core";
import { TranslationsService } from "../translations.service";
import { ActivatedRoute, Router, NavigationEnd } from "@angular/router";

// services
import { ImagesService } from "../../shared/images.service";
import { Subscription } from 'rxjs';
import { SubGallery } from 'src/app/components/shared/sub-gallery';

@Component({
  selector: "app-gallery",
  templateUrl: "./gallery.component.html",
  styleUrls: ["./gallery.component.css"]
})
export class GalleryComponent implements OnInit, OnDestroy {
  public I18n: any;
  public gallerys: any;

  public subGalleries: SubGallery[] = []
  public language: string;
  private subGallerySubscription: Subscription;
  private I18nSubscription: Subscription;
  private langSubscription: Subscription;
  public routerSubscription: Subscription;
  public selectedSubGallery: SubGallery;

  constructor(
    private translationsService: TranslationsService,
    private route: ActivatedRoute,
    private imagesService: ImagesService,
    private router: Router
  ) { }

  ngOnInit() {
    this.I18nSubscription = this.translationsService.I18n.subscribe(res => { this.I18n = res });
    this.langSubscription = this.translationsService.lang.subscribe(r => { this.language = r });

    this.subGalleries = this.imagesService.getSubGalleries();
    this.subGallerySubscription = this.imagesService.subGalleriesChange.subscribe((subGalleries: SubGallery[]) => {
      this.subGalleries = subGalleries;

      if (this.router.routerState.snapshot.url === '/gallery' && this.subGalleries.length > 0) {
        this.router.navigate([this.subGalleries[0].en.toLowerCase()], { relativeTo: this.route })
      }

      if (this.router.routerState.snapshot.url !== '/gallery' && this.subGalleries.length > 0) {
        this.selectedSubGallery = this.imagesService.getSubGalleryByEnName(this.router.routerState.snapshot.url.split('/')[2]);
      }
    })

    this.routerSubscription = this.router.events.subscribe((val) => {
      if ((val instanceof NavigationEnd) && (this.router.routerState.snapshot.url !== '/gallery')) {
        this.selectedSubGallery = this.imagesService.getSubGalleryByEnName(this.router.routerState.snapshot.url.split('/')[2]);
      }
    })
  }

  ngOnDestroy() {
    this.I18nSubscription.unsubscribe();
    this.langSubscription.unsubscribe();
    this.subGallerySubscription.unsubscribe();
    this.routerSubscription.unsubscribe();
  }
}
