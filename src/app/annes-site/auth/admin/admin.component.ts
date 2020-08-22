import { Component, OnInit, OnDestroy, ViewChild } from "@angular/core";
import { NgForm } from "@angular/forms";
import { CdkDragDrop } from "@angular/cdk/drag-drop";

import { Image } from "../../shared/image/image";
import { SubGallery } from "src/app/annes-site/shared/sub-gallery/sub-gallery";
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { FacadeService } from "../../shared/facade/facade.service";
import { ImageDialogComponent } from "./image-dialog/image-dialog.component";
import { BaseComponent } from "../../core/base/base.component";
import { takeUntil } from "rxjs/operators";
import { ImageModalComponent } from "./image-modal/image-modal.component";
import { environment } from "src/environments/environment";

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

  constructor(private dialog: MatDialog, private facade: FacadeService) {
    super();
  }

  ngOnInit() {
    this.facade.subGalleriesRequested(environment.baseUrl + "/api/gallerys");

    this.subGalleries$
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((subGalleries) => {
        this.subGalleries = subGalleries;
        this.updateDropList();
        console.log(subGalleries);
      });

    this.facade.autoLogin();

    this.facade
      .getIsSubGalleryCreated()
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

  deleteImage(imgId: string, subGalleryId: string) {
    if (confirm("Haluatko varmasti poistaa kuvan?") == false) {
      return;
    }

    this.facade.deleteImgRequested(imgId, subGalleryId);
  }

  imgMovedBetweenSubGalleries(
    fromSubGalleryId,
    toGalleryIdx,
    imgsCurrentIdx,
    imgsPreviousIdx
  ) {
    let imageChanges = [];
    let subGalleriesChanges = [];

    var fromGalleryIdx: number = this.subGalleries.findIndex(
      (sg) => sg._id === fromSubGalleryId
    );

    // imgs that already existed in the sub gallery where img was moved
    imageChanges = [
      ...imageChanges,
      ...this.subGalleries[toGalleryIdx].images.map((img, i) => {
        return {
          id: img._id,
          changes: {
            so: i < imgsCurrentIdx ? img.so : img.so + 1,
          },
        };
      }),
    ];
    // img that was moved to sub gallery
    imageChanges.push({
      id: this.subGalleries[fromGalleryIdx].images[imgsPreviousIdx]._id,
      changes: {
        gallery: this.subGalleries[toGalleryIdx]._id,
        so: imgsCurrentIdx,
      },
    });

    let temp = this.subGalleries[toGalleryIdx].images.map((img) => img._id);
    temp.push(this.subGalleries[fromGalleryIdx].images[imgsPreviousIdx]._id);

    let clonedToGallery = {
      id: this.subGalleries[toGalleryIdx]._id,
      changes: {
        images: temp,
      },
    };

    imageChanges = [
      ...imageChanges,
      this.subGalleries[fromGalleryIdx].images.map((img, i) => {
        if (i === imgsPreviousIdx) {
          return;
        }
        return {
          id: img._id,
          changes: {
            so: i < imgsPreviousIdx ? img.so : img.so - 1,
          },
        };
      }),
    ];

    let clonedFromGallery = {
      id: this.subGalleries[fromGalleryIdx]._id,
      changes: {
        images: this.subGalleries[fromGalleryIdx].images
          .map((img) => img._id)
          .filter(
            (img) =>
              img !==
              this.subGalleries[fromGalleryIdx].images[imgsPreviousIdx]._id
          ),
      },
    };

    subGalleriesChanges.push(clonedToGallery);
    subGalleriesChanges.push(clonedFromGallery);

    return [imageChanges, subGalleriesChanges];
  }

  imgMovedInsideSubGallery(
    difference,
    imgsCurrentIdx,
    imgsPreviousIdx,
    subGalleryIdx
  ) {
    let imageChanges = [];

    if (difference < 0) {
      // moved down in list
      // copy the image and images that follow
      for (
        let i = imgsCurrentIdx;
        i < this.subGalleries[subGalleryIdx].images.length;
        i++
      ) {
        imageChanges.push({
          id: this.subGalleries[subGalleryIdx].images[
            i === imgsCurrentIdx ? imgsPreviousIdx : i - 1
          ]._id,
          changes: { so: i },
        });
      }
    } else if (difference > 0) {
      // moved up in list
      for (let i = imgsCurrentIdx; i >= 0; i--) {
        imageChanges.push({
          id: this.subGalleries[subGalleryIdx].images[
            i === imgsCurrentIdx ? imgsPreviousIdx : i + 1
          ]._id,
          changes: { so: i },
        });
      }
    }

    return imageChanges;
  }

  drop(event: CdkDragDrop<string[]>, subGallery: SubGallery) {
    var toGalleryIdx = this.subGalleries.indexOf(subGallery);

    let subGalleriesChanges = [];
    let values = [];

    // img's location didn't change
    if (
      event.previousContainer === event.container &&
      event.previousIndex === event.currentIndex
    ) {
      return;
    }

    let imageChanges = [];

    if (event.previousContainer === event.container) {
      let difference = event.currentIndex - event.previousIndex;
      imageChanges = this.imgMovedInsideSubGallery(
        difference,
        event.currentIndex,
        event.previousIndex,
        toGalleryIdx
      );
    } else {
      values = this.imgMovedBetweenSubGalleries(
        event.previousContainer.id,
        toGalleryIdx,
        event.currentIndex,
        event.previousIndex
      );

      imageChanges = values[0];
      subGalleriesChanges = values[1];
    }

    this.facade.imagesUpdateToStoreRequested(imageChanges);
    this.facade.subGalleriesUpdateToStoreRequested(subGalleriesChanges);
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
      for (
        let i = event.currentIndex;
        i <= event.currentIndex - difference;
        i++
      ) {
        clonedSubGalleries.push({
          id: this.subGalleries[
            i === event.currentIndex ? event.previousIndex : i - 1
          ]._id,
          changes: { so: i },
        });
      }
    } else if (difference > 0) {
      // moved up in list
      for (
        let i = event.currentIndex;
        i >= event.currentIndex - difference;
        i--
      ) {
        clonedSubGalleries.push({
          id: this.subGalleries[
            i === event.currentIndex ? event.previousIndex : i + 1
          ]._id,
          changes: { so: i },
        });
      }
    }

    this.facade.subGalleriesUpdateToStoreRequested(clonedSubGalleries);
  }

  onSaveChanges() {
    this.facade.subGalleriesUpdateToAPIRequested();
  }

  onAddSubGallery(form: NgForm) {
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

  onDeleteSubGallery(subGallery: SubGallery) {
    if (
      confirm(
        `Haluatko varmasti poistaa gallerian '${subGallery.fi}' ja kaikki sen sisältämät kuvat?`
      )
    ) {
      this.facade.subGalleryDeleteRequested(subGallery._id);
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

  onFocusOutSubGallery(subGalleryId, field) {
    let subGalleriesChanges = [];

    for (let key in this.subGalleryForm.form.controls) {
      // new value
      let val = this.subGalleryForm.form.controls[key].value;
      // to identify sub gallery/image and where is the value associated (alt_fin/alt_en)
      let identifiers = key.split(" ");
      let subGalleryIdForm = "";
      let fieldToUpdate = "";

      subGalleryIdForm = identifiers[0].split(":")[1];

      if (subGalleryIdForm !== subGalleryId) {
        continue;
      }

      fieldToUpdate = identifiers[1];
      if (fieldToUpdate !== field) {
        continue;
      }
      subGalleriesChanges.push({
        id: subGalleryId,
        changes: {
          [fieldToUpdate]: val,
        },
      });
      this.facade.subGalleriesUpdateToStoreRequested(subGalleriesChanges);
    }
  }

  onFocusOutImg(subGalleryId, field, imgId) {
    let imgChanges = [];

    for (let key in this.subGalleryForm.form.controls) {
      // new value
      let val = this.subGalleryForm.form.controls[key].value;
      // to identify sub gallery/image and where is the value associated (alt_fin/alt_en)
      let identifiers = key.split(" ");
      let subGalleryIdForm = "";
      let imgIdForm = "";
      let fieldToUpdate = "";

      subGalleryIdForm = identifiers[0].split(":")[1];
      imgIdForm = identifiers[1].split(":")[1];

      if (subGalleryIdForm !== subGalleryId) {
        continue;
      }

      if (imgIdForm !== imgId) {
        continue;
      }

      fieldToUpdate = identifiers[2];

      if (fieldToUpdate !== field) {
        continue;
      }

      imgChanges.push({ id: imgId, changes: { [fieldToUpdate]: val } });

      this.facade.imagesUpdateToStoreRequested(imgChanges);
    }
  }
}
