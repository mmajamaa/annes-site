import { Component, OnInit } from "@angular/core";
import { TranslationsService } from "../translations.service";
import { ActivatedRoute, Router } from "@angular/router";

import { takeUntil } from "rxjs/operators";

import { Subscription } from "rxjs";
import { SubGallery } from "src/app/components/shared/sub-gallery";
import { FacadeService } from "../../shared/facade.service";
import { BaseComponent } from "../../core/base/base.component";

@Component({
  selector: "app-gallery",
  templateUrl: "./gallery.component.html",
  styleUrls: ["./gallery.component.css"],
})
export class GalleryComponent extends BaseComponent implements OnInit {
  public I18n: any;
  public language: string;
  public subGalleries$ = this.facade.selectSubGalleries();
  public selectedSubGallery$ = this.facade.getSelectedSubGallery();

  constructor(
    private translationsService: TranslationsService,
    private route: ActivatedRoute,
    private router: Router,
    private facade: FacadeService
  ) {
    super();
  }

  ngOnInit() {
    this.translationsService.I18n.pipe(takeUntil(this.ngUnsubscribe)).subscribe(
      (res) => {
        this.I18n = res;
      }
    );
    this.translationsService.lang
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((r) => {
        this.language = r;
      });
    this.selectedSubGallery$
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((selectedSubGallery) => {
        if (
          selectedSubGallery &&
          this.router.routerState.snapshot.url === "/gallery"
        ) {
          this.router.navigate([selectedSubGallery.en], {
            relativeTo: this.route,
          });
        }
      });
  }

  onSubGallerySelected(subGalleryId) {
    this.facade.selectSubGallery(subGalleryId);
  }
}
