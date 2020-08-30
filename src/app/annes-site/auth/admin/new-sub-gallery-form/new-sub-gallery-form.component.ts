import { Component, OnInit, ViewChild } from "@angular/core";
import { NgForm } from "@angular/forms";

import { BaseComponent } from "../../../core/base/base.component";
import { FacadeService } from "src/app/annes-site/shared/facade/facade.service";
import { takeUntil } from "rxjs/operators";

@Component({
  "selector": "app-new-sub-gallery-form",
  "templateUrl": "./new-sub-gallery-form.component.html",
  "styleUrls": ["./new-sub-gallery-form.component.css"],
})
export class NewSubGalleryFormComponent
  extends BaseComponent
  implements OnInit {
  @ViewChild("newSubGalleryForm")
  private readonly newSubGalleryForm: HTMLFormElement;
  public flagIcons: { "src": string; "alt": string }[] = [
    { "src": "./assets/fi.png", "alt": "fi" },
    { "src": "./assets/uk.png", "alt": "uk" },
  ];

  public ngOnInit(): void {
    this.facade
      .getIsSubGalleryCreated()
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((res: boolean) => {
        if (res) {
          this.newSubGalleryForm.reset();
        }
      });
  }

  public constructor(private readonly facade: FacadeService) {
    super();
  }

  public onAddSubGallery(form: NgForm): void {
    if (
      confirm(
        `Haluatko varmasti luoda gallerian nimeltä '${form.value.galleryFi}'?`
      )
    ) {
      this.facade.createSubGalleryRequested(
        form.value.galleryFi,
        form.value.galleryEn
      );
    }
  }
}
