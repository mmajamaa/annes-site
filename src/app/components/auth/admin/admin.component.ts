import { Component, OnInit, OnDestroy, ViewChild } from "@angular/core";
import { NgForm } from "@angular/forms";
import { CdkDragDrop, moveItemInArray, transferArrayItem } from "@angular/cdk/drag-drop";
import { Subscription } from 'rxjs';

import { ImagesService } from "../../shared/images.service";
import { Image } from "../../shared/image";
import { SubGallery } from 'src/app/components/shared/sub-gallery';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { FacadeService } from '../../shared/facade.service';
import { ImageDialogComponent } from './image-dialog/image-dialog.component';
import { BaseComponent } from '../../core/base/base.component';
import { takeUntil } from 'rxjs/operators';
import { ImageModalComponent } from './image-modal/image-modal.component'



@Component({
  selector: "app-admin",
  templateUrl: "./admin.component.html",
  styleUrls: ["./admin.component.css"]
})
export class AdminComponent extends BaseComponent implements OnInit, OnDestroy {
  public flagIcons = [
    { src: "./assets/fi.png", alt: "fi" },
    { src: "./assets/uk.png", alt: "uk" }
  ];
  public subGalleries: SubGallery[] = [];
  public imagesDropList = [];
  public subGalleries$ = this.facade.selectSubGalleries();
  @ViewChild('f') newSubGalleryForm;
  @ViewChild('subGalleryForm') subGalleryForm;
  @ViewChild(ImageModalComponent) imageModal: ImageModalComponent;

  constructor(
    private img: ImagesService,
    private dialog: MatDialog,
    private facade: FacadeService
  ) { super(); }

  ngOnInit() {
    this.facade.autoLogin();

    this.img.getSubGalleries();
    this.updateDropList();
    this.img.subGalleriesChange.pipe(takeUntil(this.ngUnsubscribe)).subscribe((subGalleries: SubGallery[]) => {
      this.subGalleries = subGalleries;
      this.updateDropList();
    })

    this.img.subGalleryCreationSuccessful.pipe(takeUntil(this.ngUnsubscribe)).subscribe((res: boolean) => {
      if (res) {
        this.newSubGalleryForm.reset();
      }
    })
  }

  updateDropList() {
    this.imagesDropList = [];
    for (let subGallery of this.subGalleries) {
      this.imagesDropList.push(subGallery._id);
    }
  }

  deleteImage(id: string) {
    // TODO: move to store
    if (confirm("Haluatko varmasti poistaa kuvan?") == false) {
      return;
    }

    this.img.deleteImage(id);
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

  dropSubGallery(event: CdkDragDrop<string[]>) {
    // TODO: update order in store
    moveItemInArray(this.subGalleries, event.previousIndex, event.currentIndex)
    // TODO: update order in store
    for (let i = 0; i < this.subGalleries.length; i++) {
      this.subGalleries[i].so = i;
    }
  }

  onSaveChanges() {
    console.log(this.subGalleryForm)
    // TODO: insert hidden fields to images and sub galleries indicating their sos
    this.img.updateSubGalleries(this.subGalleries);
  }

  onAddGallery(form: NgForm) {
    // TODO: move to store
    if (confirm(`Haluatko varmasti luoda gallerian nimeltä '${form.value.galleryFi}'?`)) {
      this.img.createGallery(form.value.galleryFi, form.value.galleryEn);
    }
  }

  onDeleteSubGallery(subGallery: SubGallery) {
    // TODO: move to store
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

  openImage(event) {
    this.imageModal.openImage(event)
  }
}
