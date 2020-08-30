import { Component, OnInit, OnDestroy, ViewChild } from "@angular/core";
import { NgForm } from "@angular/forms";
import { CdkDragDrop } from "@angular/cdk/drag-drop";

import { SubGalleryImportObj } from "src/app/annes-site/shared/sub-gallery/sub-gallery";
import {
  MatDialog,
  MatDialogConfig,
  MatDialogRef,
} from "@angular/material/dialog";
import { FacadeService } from "../../shared/facade/facade.service";
import { ImageDialogComponent } from "./image-dialog/image-dialog.component";
import { BaseComponent } from "../../core/base/base.component";
import { takeUntil } from "rxjs/operators";
import { ImageModalComponent } from "./image-modal/image-modal.component";
import { environment } from "src/environments/environment";
import { Observable } from "rxjs";
import { ImageStoreObj } from "../../shared/image/image";

interface SubGalleryChanges {
  "id": string;
  "changes": { "so"?: number; "images"?: string[] };
}

interface ImageChanges {
  "id": string;
  "changes": { "gallery"?: string; "so"?: number };
}

@Component({
  "selector": "app-admin",
  "templateUrl": "./admin.component.html",
  "styleUrls": ["./admin.component.css"],
})
export class AdminComponent extends BaseComponent implements OnInit, OnDestroy {
  public flagIcons: { "src": string; "alt": string }[] = [
    { "src": "./assets/fi.png", "alt": "fi" },
    { "src": "./assets/uk.png", "alt": "uk" },
  ];
  public subGalleries: SubGalleryImportObj[] = [];
  public imagesDropList: string[] = [];
  public subGalleries$: Observable<
    SubGalleryImportObj[]
  > = this.facade.selectSubGalleries();
  @ViewChild("subGalleryForm") private readonly subGalleryForm: HTMLFormElement;
  @ViewChild(ImageModalComponent)
  private readonly imageModal: ImageModalComponent;

  public constructor(
    private readonly dialog: MatDialog,
    private facade: FacadeService
  ) {
    super();
  }

  public ngOnInit(): void {
    this.facade.subGalleriesRequested(`${environment.baseUrl}/api/galleries`);

    this.subGalleries$
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((subGalleries: SubGalleryImportObj[]) => {
        this.subGalleries = subGalleries;
        this.updateDropList();
        console.log(subGalleries);
      });

    this.facade.autoLogin();
  }

  public updateDropList(): void {
    this.imagesDropList = [];
    for (const subGallery of this.subGalleries) {
      this.imagesDropList.push(subGallery._id);
    }
  }

  public deleteImage(imgId: string, subGalleryId: string): void {
    if (confirm("Haluatko varmasti poistaa kuvan?")) {
      this.facade.deleteImgRequested(imgId, subGalleryId);
    }
  }

  private imgMovedBetweenSubGalleries(
    fromSubGalleryId: string,
    toGalleryIdx: number,
    imgsCurrentIdx: number,
    imgsPreviousIdx: number
  ): (ImageChanges[] | SubGalleryChanges[])[] {
    let imagesChanges: ImageChanges[];
    const subGalleriesChanges: SubGalleryChanges[] = [];

    const fromGalleryIdx: number = this.subGalleries.findIndex(
      (sg: SubGalleryImportObj) => sg._id === fromSubGalleryId
    );

    // imgs that already existed in the sub gallery where img was moved
    imagesChanges = [
      ...this.subGalleries[toGalleryIdx].images.map(
        (img: ImageStoreObj, i: number) => {
          return {
            "id": img._id,
            "changes": {
              "so": i < imgsCurrentIdx ? img.so : img.so + 1,
            },
          };
        }
      ),
    ];
    // img that was moved to sub gallery
    imagesChanges.push({
      "id": this.subGalleries[fromGalleryIdx].images[imgsPreviousIdx]._id,
      "changes": {
        "gallery": this.subGalleries[toGalleryIdx]._id,
        "so": imgsCurrentIdx,
      },
    });

    const toGalleryImgIds: string[] = this.subGalleries[
      toGalleryIdx
    ].images.map((img: ImageStoreObj) => img._id);
    toGalleryImgIds.push(
      this.subGalleries[fromGalleryIdx].images[imgsPreviousIdx]._id
    );

    const clonedToGallery: SubGalleryChanges = {
      "id": this.subGalleries[toGalleryIdx]._id,
      "changes": {
        "images": toGalleryImgIds,
      },
    };

    imagesChanges = [
      ...imagesChanges,
      ...this.subGalleries[fromGalleryIdx].images
        .filter((img: ImageStoreObj, i: number) => i !== imgsPreviousIdx)
        .map((img: ImageStoreObj, i: number) => {
          return {
            "id": img._id,
            "changes": {
              "so": i < imgsPreviousIdx ? img.so : img.so - 1,
            },
          };
        }),
    ];

    const clonedFromGallery: SubGalleryChanges = {
      "id": this.subGalleries[fromGalleryIdx]._id,
      "changes": {
        "images": this.subGalleries[fromGalleryIdx].images
          .map((img: ImageStoreObj) => img._id)
          .filter(
            (imgId: string) =>
              imgId !==
              this.subGalleries[fromGalleryIdx].images[imgsPreviousIdx]._id
          ),
      },
    };

    subGalleriesChanges.push(clonedToGallery);
    subGalleriesChanges.push(clonedFromGallery);

    return [imagesChanges, subGalleriesChanges];
  }

  private imgMovedInsideSubGallery(
    difference: number,
    imgsCurrentIdx: number,
    imgsPreviousIdx: number,
    subGalleryIdx: number
  ): ImageChanges[] {
    const imagesChanges: ImageChanges[] = [];

    if (difference < 0) {
      // moved down in list
      // copy the image and images that follow
      for (
        let i: number = imgsCurrentIdx;
        i < this.subGalleries[subGalleryIdx].images.length;
        i++
      ) {
        imagesChanges.push({
          "id": this.subGalleries[subGalleryIdx].images[
            i === imgsCurrentIdx ? imgsPreviousIdx : i - 1
          ]._id,
          "changes": { "so": i },
        });
      }
    } else if (difference > 0) {
      // moved up in list
      for (let i: number = imgsCurrentIdx; i >= 0; i--) {
        imagesChanges.push({
          "id": this.subGalleries[subGalleryIdx].images[
            i === imgsCurrentIdx ? imgsPreviousIdx : i + 1
          ]._id,
          "changes": { "so": i },
        });
      }
    }

    return imagesChanges;
  }

  public drop(
    event: CdkDragDrop<string[]>,
    subGallery: SubGalleryImportObj
  ): void {
    const toGalleryIdx: number = this.subGalleries.indexOf(subGallery);

    let subGalleriesChanges: SubGalleryChanges[] = [];
    let values: (ImageChanges[] | SubGalleryChanges[])[] = [];

    // img's location didn't change
    if (
      event.previousContainer === event.container &&
      event.previousIndex === event.currentIndex
    ) {
      return;
    }

    let imagesChanges: ImageChanges[] = [];

    if (event.previousContainer === event.container) {
      const difference: number = event.currentIndex - event.previousIndex;
      imagesChanges = this.imgMovedInsideSubGallery(
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

      imagesChanges = values[0];
      subGalleriesChanges = values[1];
    }

    this.facade.imagesUpdateToStoreRequested(imagesChanges);
    this.facade.subGalleriesUpdateToStoreRequested(subGalleriesChanges);
  }

  public dropSubGallery(event: CdkDragDrop<string[]>): void {
    // sub gallery's location didn't change
    if (event.previousIndex === event.currentIndex) {
      return;
    }

    const clonedSubGalleries: SubGalleryChanges[] = [];
    const difference: number = event.currentIndex - event.previousIndex;

    if (difference < 0) {
      // moved down in list
      for (
        let i: number = event.currentIndex;
        i <= event.currentIndex - difference;
        i++
      ) {
        clonedSubGalleries.push({
          "id": this.subGalleries[
            i === event.currentIndex ? event.previousIndex : i - 1
          ]._id,
          "changes": { "so": i },
        });
      }
    } else if (difference > 0) {
      // moved up in list
      for (
        let i: number = event.currentIndex;
        i >= event.currentIndex - difference;
        i--
      ) {
        clonedSubGalleries.push({
          "id": this.subGalleries[
            i === event.currentIndex ? event.previousIndex : i + 1
          ]._id,
          "changes": { "so": i },
        });
      }
    }

    this.facade.subGalleriesUpdateToStoreRequested(clonedSubGalleries);
  }

  public onDeleteSubGallery(subGallery: SubGalleryImportObj): void {
    if (
      confirm(
        `Haluatko varmasti poistaa gallerian '${subGallery.fi}' ja kaikki sen sisältämät kuvat?`
      )
    ) {
      this.facade.subGalleryDeleteRequested(subGallery._id);
    }
  }

  public onAddImage(subGallery: SubGalleryImportObj): void {
    const dialogConfig: MatDialogConfig = new MatDialogConfig();
    dialogConfig.panelClass = "custom-dialog-container";

    const dialogRef: MatDialogRef<ImageDialogComponent> = this.dialog.open(
      ImageDialogComponent,
      dialogConfig
    );
    dialogRef.componentInstance.galleryId = subGallery._id;
  }

  public openImage(event: HTMLImageElement): void {
    this.imageModal.openImage(event);
  }

  public onFocusOutSubGallery(subGalleryId: string, field: string): void {
    const subGalleriesChanges: SubGalleryChanges[] = [];

    for (const key of this.subGalleryForm.form.controls) {
      // new value
      const val: string = this.subGalleryForm.form.controls[key].value;
      // to identify sub gallery/image and where is the value associated (alt_fin/alt_en)
      const identifiers: string[] = key.split(" ");
      let subGalleryIdForm: string;
      let fieldToUpdate: string;

      subGalleryIdForm = identifiers[0].split(":")[1];

      if (subGalleryIdForm !== subGalleryId) {
        continue;
      }

      fieldToUpdate = identifiers[1];

      if (fieldToUpdate !== field) {
        continue;
      }

      subGalleriesChanges.push({
        "id": subGalleryId,
        "changes": {
          [fieldToUpdate]: val,
        },
      });
      this.facade.subGalleriesUpdateToStoreRequested(subGalleriesChanges);
    }
  }

  public onFocusOutImg(
    subGalleryId: string,
    field: string,
    imgId: string
  ): void {
    const imagesChanges: ImageChanges[] = [];

    for (const key of this.subGalleryForm.form.controls) {
      // new value
      const val: string = this.subGalleryForm.form.controls[key].value;
      // to identify sub gallery/image and where is the value associated (alt_fin/alt_en)
      const identifiers: string[] = key.split(" ");
      let subGalleryIdForm: string;
      let imgIdForm: string;
      let fieldToUpdate: string;

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

      imagesChanges.push({ "id": imgId, "changes": { [fieldToUpdate]: val } });

      this.facade.imagesUpdateToStoreRequested(imagesChanges);
    }
  }
}
