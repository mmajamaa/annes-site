import { Component, OnInit } from "@angular/core";
import { environment } from "src/environments/environment";

import { takeUntil } from "rxjs/operators";
import { Observable } from "rxjs";

import { TranslationsService } from "../translations.service";
import { FacadeService } from "../../shared/facade/facade.service";
import { BaseComponent } from "../../core/base/base.component";
import { SubGalleryImportObj } from "../../shared/sub-gallery/sub-gallery";

@Component({
  "selector": "app-gallery",
  "templateUrl": "./gallery.component.html",
  "styleUrls": ["./gallery.component.css"],
})
export class GalleryComponent extends BaseComponent implements OnInit {
  public I18n: any;
  public language: string;
  public subGalleries$: Observable<
    SubGalleryImportObj[]
  > = this.facade.selectSubGalleries();
  public selectedSubGallery$: Observable<
    SubGalleryImportObj
  > = this.facade.getSelectedSubGallery();

  public constructor(
    private translationsService: TranslationsService,
    private facade: FacadeService
  ) {
    super();
  }

  public ngOnInit(): void {
    this.facade.subGalleriesRequested(environment.subGalleryUrl);

    this.translationsService.I18n.pipe(takeUntil(this.ngUnsubscribe)).subscribe(
      (res) => {
        this.I18n = res;
      }
    );
    this.translationsService.lang
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((r: string) => {
        this.language = r;
      });
  }

  public onSubGallerySelected(subGalleryId: string): void {
    this.facade.selectSubGallery(subGalleryId);
  }
}
