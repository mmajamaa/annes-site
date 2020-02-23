import { Component, OnInit } from "@angular/core";
import { ImagesService } from "src/app/services/images.service";
import { NgForm } from "@angular/forms";
import { Image } from "../../interfaces/image";

@Component({
  selector: "app-upload-component",
  templateUrl: "./upload-component.component.html",
  styleUrls: ["./upload-component.component.css"]
})
export class UploadComponentComponent implements OnInit {
  file: File = null;
  imgUrl: any;
  public images: Image[];
  public image: Image;

  constructor(private img: ImagesService) {}

  ngOnInit(): void {}

  onFileSelected(files) {
    this.file = files[0];

    const reader = new FileReader();
    reader.readAsDataURL(files[0]);
    reader.onload = event => {
      this.imgUrl = reader.result;
    };
  }

  uploadFile(form: NgForm) {
    if (confirm("Haluatko varmasti ladata kuvan?") == false) {
      return;
    }
    const fd = new FormData();
    fd.append("image", this.file);
    fd.append("alt_fi", form.value.alt_fi);
    fd.append("alt_en", form.value.alt_en);
    this.img.uploadImage(fd, form.value.gallery).subscribe(
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
        console.log(this.images);
        // empty form
        form.reset();
        this.file = null;
        this.imgUrl = null;
      },
      error => {
        console.log(error);
      }
    );
  }
}
