import { Component, OnInit, OnDestroy } from "@angular/core";
import { Router } from "@angular/router";
import { NgForm } from "@angular/forms";
import { DomSanitizer } from "@angular/platform-browser";
import { CdkDragDrop, moveItemInArray, transferArrayItem } from "@angular/cdk/drag-drop";

import { Subscription } from 'rxjs';

import { AuthenticationService } from "../../services/authentication.service";
import { ImagesService } from "../../services/images.service";
import { Image } from "../../interfaces/image";
import { SnackBarService } from 'src/app/services/snack-bar.service';
import { SubGallery } from 'src/app/interfaces/sub-gallery';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ImageDialogComponent } from '../image-dialog/image-dialog.component';



@Component({
  selector: "app-admin",
  templateUrl: "./admin.component.html",
  styleUrls: ["./admin.component.css"]
})
export class AdminComponent implements OnInit, OnDestroy {
  username = "";
  public images: Image[];
  public subGalleries: SubGallery[];
  private imageSubscription: Subscription;
  private subGallerySubscription: Subscription;


  constructor(
    private router: Router,
    private auth: AuthenticationService,
    private img: ImagesService,
    private domSanitizer: DomSanitizer,
    private snackBarService: SnackBarService,
    private dialog: MatDialog
  ) { }

  ngOnInit() {
    this.images = this.img.getImages();
    this.imageSubscription = this.img.imagesChange.subscribe((images: Image[]) => {
      this.images = images;
    });

    this.img.getSubGalleries();
    this.subGallerySubscription = this.img.subGalleriesChange.subscribe((subGalleries: SubGallery[]) => {
      this.subGalleries = subGalleries;
    })
  }

  deleteImage(id: string) {
    if (confirm("Haluatko varmasti poistaa kuvan?") == false) {
      return;
    }

    this.img.deleteImage(id);
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

  drop(event: CdkDragDrop<string[]>, subGallery: SubGallery) {
    var toGalleyIdx = this.subGalleries.indexOf(subGallery);

    if (event.previousContainer === event.container) {
      moveItemInArray(this.subGalleries[toGalleyIdx].images, event.previousIndex, event.currentIndex);
      for (let i = 0; i < this.subGalleries[toGalleyIdx].images.length; i++) {
        this.subGalleries[toGalleyIdx].images[i].so = i;
      }
    } else {
      for (let i = 0; i < this.subGalleries.length; i++) {
        if (this.subGalleries[i]._id === event.previousContainer.id) {
          var fromGalleryIdx: number = i;
          continue;
        }
      }

      transferArrayItem(this.subGalleries[fromGalleryIdx].images, this.subGalleries[toGalleyIdx].images, event.previousIndex, event.currentIndex);
      
      for (let i = 0; i < this.subGalleries[toGalleyIdx].images.length; i++) {
        this.subGalleries[toGalleyIdx].images[i].so = i;
        this.subGalleries[toGalleyIdx].images[i].gallery = subGallery._id;
      }

      for (let i = 0; i < this.subGalleries[fromGalleryIdx].images.length; i++) {
        this.subGalleries[fromGalleryIdx].images[i].so = i;
      }
      

    }
  }

  editImages() {
    this.img.updateSubGalleries(this.subGalleries);
  }

  onAddGallery(form: NgForm) {
    // TODO: also, add English name for the sub-gallery!
    if (confirm(`Haluatko varmasti luoda gallerian nimeltä '${form.value.gallery}'?`)) {
      this.img.createGallery(form.value.gallery, form.value.gallery);
    }
  }

  onDeleteSubGallery(subGallery: SubGallery) {
    if (confirm(`Haluatko varmasti poistaa gallerian '${subGallery.fi}' ja kaikki sen sisältämät kuvat?`)) {
      this.img.deleteGallery(subGallery._id);
    }
  }

  onAddImage(subGallery: SubGallery) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.panelClass = "custom-dialog-container";

    const dialogRef = this.dialog.open(ImageDialogComponent, dialogConfig);
    dialogRef.componentInstance.galleryId = subGallery._id
  }

  ngOnDestroy() {
    this.imageSubscription.unsubscribe();
    this.subGallerySubscription.unsubscribe();
  }
}
