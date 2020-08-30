import { NgForm } from "@angular/forms";
import { Component, OnInit, ViewChild, Input } from "@angular/core";

import { MatDialogRef } from "@angular/material/dialog";
import { takeUntil } from "rxjs/operators";
import { NgxImageCompressService, DOC_ORIENTATION } from "ngx-image-compress";

import { ImageDialogComponent } from "../image-dialog/image-dialog.component";
import { FacadeService } from "../../../shared/facade/facade.service";
import { BaseComponent } from "src/app/annes-site/core/base/base.component";
import { ImageUploadObj } from "src/app/annes-site/shared/image/image";

@Component({
  "selector": "app-upload-component",
  "templateUrl": "./upload-component.component.html",
  "styleUrls": ["./upload-component.component.css"],
})
export class UploadComponentComponent extends BaseComponent implements OnInit {
  public file: File = null;
  public imgUrl: string;
  public disabled: boolean = true;
  public loading: boolean = false;
  @ViewChild("uploadForm") private readonly uploadForm: HTMLFormElement;
  @Input() private readonly galleryId: string;

  public constructor(
    public dialogRef: MatDialogRef<ImageDialogComponent>,
    private imageCompress: NgxImageCompressService,
    private facade: FacadeService
  ) {
    super();
  }

  public ngOnInit(): void {
    this.facade
      .getIsUploadingImg()
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((status: string) => {
        if (status === "completed") {
          this.uploadForm.reset();
          this.file = null;
          this.imgUrl = null;
          this.dialogRef.close();
        } else if (status === "cancelled") {
          this.loading = false;
        }
      });
  }

  public uploadFile(form: NgForm): void {
    if (confirm("Haluatko varmasti ladata kuvan?")) {
      this.loading = true;

      const uploadObject: ImageUploadObj = {
        "alt_fi": form.value.alt_fi,
        "alt_en": form.value.alt_en,
        "image": this.imgUrl,
      };

      this.facade.imgUploadRequested(uploadObject, this.galleryId);
    }
  }

  public cancelUpload(): void {
    this.dialogRef.close();
  }

  public compressFile(): void {
    this.imageCompress
      .uploadFile()
      .then(
        ({
          image,
          orientation,
        }: {
          image: string;
          orientation: DOC_ORIENTATION;
        }) => {
          this.loading = true;

          const quality: number =
            this.imageCompress.byteCount(image) > 1500000
              ? (1500000 / this.imageCompress.byteCount(image)) * 100
              : 100;

          this.imageCompress
            .compressFile(image, orientation, 100, quality)
            .then((result: string) => {
              this.imgUrl = result;
              this.disabled = false;

              this.loading = false;
            });
        }
      );
  }
}
