import { Component, OnInit, OnDestroy, ViewChild } from "@angular/core";
import { NgForm } from "@angular/forms";
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from "@angular/cdk/drag-drop";

import { ImagesService } from "../../shared/images.service";
import { Image } from "../../shared/image";
import { SubGallery } from "src/app/components/shared/sub-gallery";
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { FacadeService } from "../../shared/facade.service";
import { ImageDialogComponent } from "./image-dialog/image-dialog.component";
import { BaseComponent } from "../../core/base/base.component";
import { takeUntil } from "rxjs/operators";
import { ImageModalComponent } from "./image-modal/image-modal.component";

@Component({
  selector: "app-admin",
  templateUrl: "./admin.component.html",
  styleUrls: ["./admin.component.css"],
})
export class AdminComponent extends BaseComponent implements OnInit, OnDestroy {
  public flagIcons = [
    { src: "./assets/fi.png", alt: "fi" },
    { src: "./assets/uk.png", alt: "uk" },
  ];
  public subGalleries: SubGallery[] = [];
  public imagesDropList = [];
  public subGalleries$ = this.facade.selectSubGalleries();
  @ViewChild("f") newSubGalleryForm;
  @ViewChild("subGalleryForm") subGalleryForm;
  @ViewChild(ImageModalComponent) imageModal: ImageModalComponent;

  constructor(
    private img: ImagesService,
    private dialog: MatDialog,
    private facade: FacadeService
  ) {
    super();
  }

  ngOnInit() {
    this.subGalleries$
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((subGalleries) => {
        // TODO:
        // this.subGalleries = subGalleries;
        // this.updateDropList();
        console.log(subGalleries);
      });

    this.facade.autoLogin();

    this.img.getSubGalleries();
    this.updateDropList();
    this.img.subGalleriesChange
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((subGalleries: SubGallery[]) => {
        this.subGalleries = subGalleries;
        this.updateDropList();
      });

    this.img.subGalleryCreationSuccessful
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((res: boolean) => {
        if (res) {
          this.newSubGalleryForm.reset();
        }
      });
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

    let subGalleriesChanges = [];

    // img's location didn't change
    if (
      event.previousContainer === event.container &&
      event.previousIndex === event.currentIndex
    ) {
      return;
    }

    if (event.previousContainer === event.container) {
      let imageChanges = [];

      let difference = event.currentIndex - event.previousIndex;

      if (difference < 0) {
        // moved down in location
        // copy the image and images that follow
        for (
          let i = event.currentIndex;
          i < this.subGalleries[toGalleyIdx].images.length;
          i++
        ) {
          let imageChange = {
            ...this.subGalleries[toGalleyIdx].images[
              i === event.currentIndex ? event.previousIndex : i - 1
            ],
            so: i,
          };
          imageChanges.push(imageChange);
        }
      } else if (difference > 0) {
        // moved up in list

        for (let i = event.currentIndex; i >= 0; i--) {
          let imageChange = {
            ...this.subGalleries[toGalleyIdx].images[
              i === event.currentIndex ? event.previousIndex : i + 1
            ],
            so: i,
          };
          imageChanges.push(imageChange);
        }
      }

      // update single sub gallery
      subGalleriesChanges.push({
        id: this.subGalleries[toGalleyIdx]._id,
        changes: { images: imageChanges },
      });

      // between the same sub gallery, TODO: old implementation, rm
      for (let i = 0; i < this.subGalleries[toGalleyIdx].images.length; i++) {
        this.subGalleries[toGalleyIdx].images[i].so = i;
      }

      moveItemInArray(
        this.subGalleries[toGalleyIdx].images,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      for (let i = 0; i < this.subGalleries.length; i++) {
        if (this.subGalleries[i]._id === event.previousContainer.id) {
          var fromGalleryIdx: number = i;
          continue;
        }
      }

      // move image between sub galleries
      let clonedToGallerysImgs = [];
      // clone imgs that already existed in the sub gallery
      for (let i = 0; i < this.subGalleries[toGalleyIdx].images.length; i++) {
        clonedToGallerysImgs.push({
          ...this.subGalleries[toGalleyIdx].images[i],
          so:
            i < event.currentIndex
              ? this.subGalleries[toGalleyIdx].images[i].so
              : this.subGalleries[toGalleyIdx].images[i].so + 1,
        });
      }
      // clone new img
      clonedToGallerysImgs.push({
        ...this.subGalleries[fromGalleryIdx].images[event.previousIndex],
        so: event.currentIndex,
      });

      let clonedToGallery = {
        id: this.subGalleries[toGalleyIdx]._id,
        changes: {
          images: clonedToGallerysImgs,
        },
      };

      let clonedFromGallerysImgs = [];
      for (
        let i = 0;
        i < this.subGalleries[fromGalleryIdx].images.length;
        i++
      ) {
        if (i === event.previousIndex) {
          continue;
        }
        clonedFromGallerysImgs.push({
          ...this.subGalleries[fromGalleryIdx].images[i],
          so:
            i < event.previousIndex
              ? this.subGalleries[fromGalleryIdx].images[i].so
              : this.subGalleries[fromGalleryIdx].images[i].so - 1,
        });
      }
      let clonedFromGallery = {
        id: this.subGalleries[fromGalleryIdx]._id,
        changes: {
          images: clonedFromGallerysImgs,
        },
      };

      subGalleriesChanges.push(clonedToGallery);
      subGalleriesChanges.push(clonedFromGallery);

      // TODO: old implementation, rm all the code below from this block
      transferArrayItem(
        this.subGalleries[fromGalleryIdx].images,
        this.subGalleries[toGalleyIdx].images,
        event.previousIndex,
        event.currentIndex
      );

      // update togallery's sos
      for (let i = 0; i < this.subGalleries[toGalleyIdx].images.length; i++) {
        this.subGalleries[toGalleyIdx].images[i].so = i;
        this.subGalleries[toGalleyIdx].images[i].gallery = subGallery._id;
      }

      // update fromgallery's sos
      for (
        let i = 0;
        i < this.subGalleries[fromGalleryIdx].images.length;
        i++
      ) {
        this.subGalleries[fromGalleryIdx].images[i].so = i;
      }
    }

    this.facade.subGalleriesUpdateRequested(subGalleriesChanges);
  }

  dropSubGallery(event: CdkDragDrop<string[]>) {
    // sub gallery's location didn't change
    if (event.previousIndex === event.currentIndex) {
      return;
    }

    let clonedSubGalleries = [];
    let difference = event.currentIndex - event.previousIndex;

    if (difference < 0) {
      // moved down in list
      // TODO: only update ones between currentIndex and previousIndex
      for (let i = event.currentIndex; i < this.subGalleries.length; i++) {
        clonedSubGalleries.push({
          id: this.subGalleries[
            i === event.currentIndex ? event.previousIndex : i
          ]._id,
          changes: { so: i },
        });
      }
    } else if (difference > 0) {
      // moved up in list
      // TODO: only update ones between currentIndex and previousIndex
      for (let i = event.currentIndex; i >= 0; i--) {
        clonedSubGalleries.push({
          id: this.subGalleries[
            i === event.currentIndex ? event.previousIndex : i
          ]._id,
          changes: { so: i },
        });
      }
    }

    // TODO: old implementation, rm all the code below from this block
    moveItemInArray(this.subGalleries, event.previousIndex, event.currentIndex);

    for (let i = 0; i < this.subGalleries.length; i++) {
      this.subGalleries[i].so = i;
    }

    this.facade.subGalleriesUpdateRequested(clonedSubGalleries);
  }

  onSaveChanges() {
    console.log(this.subGalleryForm);
    // TODO: insert hidden fields to images and sub galleries indicating their sos
    this.img.updateSubGalleries(this.subGalleries);
  }

  onAddGallery(form: NgForm) {
    // TODO: move to store
    if (
      confirm(
        `Haluatko varmasti luoda gallerian nimeltä '${form.value.galleryFi}'?`
      )
    ) {
      this.img.createGallery(form.value.galleryFi, form.value.galleryEn);
    }
  }

  onDeleteSubGallery(subGallery: SubGallery) {
    // TODO: move to store
    if (
      confirm(
        `Haluatko varmasti poistaa gallerian '${subGallery.fi}' ja kaikki sen sisältämät kuvat?`
      )
    ) {
      this.img.deleteGallery(subGallery._id);
    }
  }

  onAddImage(subGallery: SubGallery) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.panelClass = "custom-dialog-container";

    const dialogRef = this.dialog.open(ImageDialogComponent, dialogConfig);
    dialogRef.componentInstance.galleryId = subGallery._id;
  }

  openImage(event) {
    this.imageModal.openImage(event);
  }
}
