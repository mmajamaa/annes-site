import { Component, OnInit, OnDestroy } from "@angular/core";

import { takeUntil } from "rxjs/operators";

import { TranslationsService } from "../translations.service";
import { SubGallery } from "../../shared/sub-gallery";
import { FacadeService } from "../../shared/facade.service";
import { BaseComponent } from "../../core/base/base.component";

@Component({
  selector: "app-sub-gallery",
  templateUrl: "./sub-gallery.component.html",
  styleUrls: ["./sub-gallery.component.css"],
})
export class SubGalleryComponent extends BaseComponent
  implements OnInit, OnDestroy {
  public language: string;
  public I18n: any;
  public subGallery$ = this.facade.getSelectedSubGallery();

  constructor(
    private translationsService: TranslationsService,
    private facade: FacadeService
  ) {
    super();
  }

  ngOnInit(): void {
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
}
