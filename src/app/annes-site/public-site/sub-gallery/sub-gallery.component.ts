import { Component, OnInit, OnDestroy } from "@angular/core";

import { takeUntil } from "rxjs/operators";
import { Observable } from "rxjs";

import { TranslationsService } from "../translations.service";
import { SubGalleryImportObj } from "../../shared/sub-gallery/sub-gallery";
import { FacadeService } from "../../shared/facade/facade.service";
import { BaseComponent } from "../../core/base/base.component";

@Component({
  "selector": "app-sub-gallery",
  "templateUrl": "./sub-gallery.component.html",
  "styleUrls": ["./sub-gallery.component.css"],
})
export class SubGalleryComponent
  extends BaseComponent
  implements OnInit, OnDestroy {
  public language: string;
  public I18n: any;
  public subGallery$: Observable<
    SubGalleryImportObj
  > = this.facade.getSelectedSubGallery();

  public constructor(
    private readonly translationsService: TranslationsService,
    private readonly facade: FacadeService
  ) {
    super();
  }

  public ngOnInit(): void {
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
}
