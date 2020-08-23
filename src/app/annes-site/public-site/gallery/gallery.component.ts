import { Component, OnInit } from "@angular/core";
import { environment } from "src/environments/environment";

import { takeUntil } from "rxjs/operators";

import { TranslationsService } from "../translations.service";
import { FacadeService } from "../../shared/facade/facade.service";
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
    private facade: FacadeService
  ) {
    super();
  }

  ngOnInit() {
    this.facade.subGalleriesRequested(environment.subGalleryUrl);

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
  }

  onSubGallerySelected(subGalleryName) {
    this.facade.selectSubGallery(subGalleryName);
  }
}
