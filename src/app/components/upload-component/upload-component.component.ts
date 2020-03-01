import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { ImagesService } from "src/app/services/images.service";
import { NgForm } from "@angular/forms";
import { Image } from "../../interfaces/image";
import { MatDialogRef } from "@angular/material/dialog";
import { ImageDialogComponent } from "../image-dialog/image-dialog.component";
import { NgxImageCompressService } from "ngx-image-compress";

@Component({
  selector: "app-upload-component",
  templateUrl: "./upload-component.component.html",
  styleUrls: ["./upload-component.component.css"]
})
export class UploadComponentComponent implements OnInit {
  file: File = null;
  imgUrl: any;
  public image: Image;
  @Input() images: Image[];
  @Output() imagesChange = new EventEmitter<boolean>();
  public disabled = true;
  public loading = false;

  constructor(
    private img: ImagesService,
    public dialogRef: MatDialogRef<ImageDialogComponent>,
    private imageCompress: NgxImageCompressService
  ) {}

  ngOnInit(): void {}

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

    this.img.uploadImage(uploadObject, form.value.gallery).subscribe(
      (res: any) => {
        // add image to list
        let image = {
          Key: res.Key,
          _id: res._id,
          url: res.url,
          alt_fi: res.alt_fi,
          alt_en: res.alt_en,
          so: res.so,
          gallery: res.gallery
        };
        this.images.push(image);
        // empty form
        form.reset();
        this.file = null;
        this.imgUrl = null;
        this.dialogRef.close();
      },
      error => {
        console.log(error);
      }
    );
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
}
