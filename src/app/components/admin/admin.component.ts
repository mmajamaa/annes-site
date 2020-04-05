import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { NgForm } from "@angular/forms";
import { DomSanitizer } from "@angular/platform-browser";

import { AuthenticationService } from "../../services/authentication.service";
import { ImagesService } from "../../services/images.service";

import { Image } from "../../interfaces/image";

import { CdkDragDrop, moveItemInArray } from "@angular/cdk/drag-drop";
import { MatSnackBar, MatSnackBarConfig } from "@angular/material/snack-bar";
import { SnackBarComponent } from "../snack-bar/snack-bar.component";

@Component({
  selector: "app-admin",
  templateUrl: "./admin.component.html",
  styleUrls: ["./admin.component.css"]
})
export class AdminComponent implements OnInit {
  username = "";
  public images: Image[];

  constructor(
    private router: Router,
    private auth: AuthenticationService,
    private img: ImagesService,
    private domSanitizer: DomSanitizer,
    private snackBar: MatSnackBar
  ) {

    this.img.getImages().subscribe(res => {
      this.images = res;
    });
  }

  ngOnInit() {}

  deleteImage(key: String) {
    if (confirm("Haluatko varmasti poistaa kuvan?") == false) {
      return;
    }

    this.img.deleteImage(key).subscribe(
      res => {
        // delete image from list
        let img = this.images.find(i => i.Key == key);
        const index: number = this.images.indexOf(img);
        if (index !== -1) {
          this.images.splice(index, 1);
        }
        this.openSnackBar("Kuva poistettiin onnistuneesti.", "ok-snackbar");
      },
      err => {
        this.openSnackBar(
          "Virhe kuvan poistamisessa. Yritä uudelleen.",
          "warn-snackbar"
        );
      }
    );
  }

  openImage(event) {
    // Get the modal
    var modal = document.getElementById("myModal");
    console.log(event.target.src);
    // Get the image and insert it inside the modal - use its "alt" text as a caption
    var img = document.getElementById("myImg");
    var modalImg = document.getElementById("img01");
    var captionText = document.getElementById("caption");
    console.log("jaa");
    modal.style.display = "block";
    (<HTMLImageElement>modalImg).src = event.target.src;
    captionText.innerHTML = event.target.alt;
  }

  closeModal() {
    var modal = document.getElementById("myModal");
    modal.style.display = "none";
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.images, event.previousIndex, event.currentIndex);
    for (let i = 0; i < this.images.length; i++) {
      this.images[i].so = i;
    }
  }

  editImages(form: NgForm) {
    // TODO: only update changed values
    for (let i = 0; i < this.images.length; i++) {
      let altFi = `${this.images[i].Key}:alt_fin`;
      let altEn = `${this.images[i].Key}:alt_en`;

      if (form.value[altFi] !== this.images[i].alt_fi) {
        this.images[i].alt_fi = form.value[altFi];
      }

      if (form.value[altEn] !== this.images[i].alt_en) {
        this.images[i].alt_en = form.value[altEn];
      }
    }

    this.img.saveOrder({ images: this.images }).subscribe(
      res => {
        this.openSnackBar("Tallennettiin muutokset.", "ok-snackbar");
      },
      err => {
        this.openSnackBar(
          "Virhe muutoksien tallentamisessa. Yritä uudelleen.",
          "warn-snackbar"
        );
      }
    );
  }

  openSnackBar(message, panelClass) {
    const config = new MatSnackBarConfig();
    config.duration = 2000;
    config.panelClass = [panelClass];
    config.data = message;

    this.snackBar.openFromComponent(SnackBarComponent, config);
  }
}
