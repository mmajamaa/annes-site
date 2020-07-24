import { Component, OnInit, OnDestroy, ViewChild, Input } from "@angular/core";
import { ImagesService } from "src/app/components/shared/images.service";
import { NgForm } from "@angular/forms";
import { MatDialogRef } from "@angular/material/dialog";
import { ImageDialogComponent } from "../image-dialog/image-dialog.component";
import { NgxImageCompressService } from "ngx-image-compress";
import { Subscription } from 'rxjs';

@Component({
  selector: "app-upload-component",
  templateUrl: "./upload-component.component.html",
  styleUrls: ["./upload-component.component.css"]
})
export class UploadComponentComponent implements OnInit, OnDestroy {
  public file: File = null;
  public imgUrl: string;
  public disabled = true;
  public loading = false;
  private uploadStatus: Subscription;
  @ViewChild('uploadForm') uploadForm;
  @Input() galleryId: string;

  constructor(
    private img: ImagesService,
    public dialogRef: MatDialogRef<ImageDialogComponent>,
    private imageCompress: NgxImageCompressService,
  ) { }

  ngOnInit(): void {
    this.uploadStatus = this.img.uploadSuccesful.subscribe((status: string) => {
      if (status === 'completed') {
        this.uploadForm.reset();
        this.file = null;
        this.imgUrl = null;
        this.dialogRef.close();
      } else if (status === 'cancelled') {
        this.loading = false;
      }
    })
  }

  uploadFile(form: NgForm) {
    if (confirm("Haluatko varmasti ladata kuvan?") == false) {
      return;
    }

    this.loading = true;

    const uploadObject = {
      alt_fi: form.value.alt_fi,
      alt_en: form.value.alt_en,
      image: this.imgUrl
    };

    this.img.uploadImage(uploadObject, this.galleryId);
  }

  public cancelUpload() {
    this.dialogRef.close();
  }

  compressFile() {
    this.imageCompress.uploadFile().then(({ image, orientation }) => {
      this.loading = true;

      const quality =
        this.imageCompress.byteCount(image) > 1500000
          ? (1500000 / this.imageCompress.byteCount(image)) * 100
          : 100;

      this.imageCompress
        .compressFile(image, orientation, 100, quality)
        .then(result => {
          this.imgUrl = result;
          this.disabled = false;

          this.loading = false;
        });
    });
  }

  ngOnDestroy() {
    this.uploadStatus.unsubscribe();
  }
}
