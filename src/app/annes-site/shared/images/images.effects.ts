import { Injectable } from "@angular/core";

import { Actions, ofType, Effect } from "@ngrx/effects";
import { of } from "rxjs";
import { switchMap, catchError, map } from "rxjs/operators";

import { SnackBarService } from "../snack-bar.service";
import * as ImageActions from "./images.actions";
import { ImagesService } from "../images.service";

@Injectable({ providedIn: "root" })
export class ImageEffetcs {
  @Effect()
  ImgUploadRequested = this.actions$.pipe(
    ofType(ImageActions.IMG_UPLOAD_REQUESTED),
    switchMap((actionData: ImageActions.ImgUploadRequested) => {
      return this.img
        .uploadImage(
          actionData.payload.uploadObject,
          actionData.payload.subGalleryId
        )
        .pipe(
          map((imgData) => {
            this.snackBarService.openSnackBar(
              "Kuva ladattiin onnistuneesti.",
              "ok-snackbar"
            );
            return new ImageActions.ImgUploadCompleted({ imgData });
          }),
          catchError((errorRes) => {
            this.snackBarService.openSnackBar(
              "Virhe kuvan lataamisessa. Yritä uudestaan.",
              "warn-snackbar"
            );
            return of(new ImageActions.ImgUploadCancelled());
          })
        );
    }),
    switchMap((action) => [action, new ImageActions.ResetUploadingImg()])
  );

  @Effect()
  ImgDeleteRequested = this.actions$.pipe(
    ofType(ImageActions.IMG_DELETE_REQUESTED),
    switchMap((actionData: ImageActions.ImgDeleteRequested) => {
      return this.img.deleteImage(actionData.payload.imgId).pipe(
        map((imgData: any) => {
          this.snackBarService.openSnackBar(
            "Kuva poistettiin onnistuneesti.",
            "ok-snackbar"
          );
          return new ImageActions.ImgDeleteCompleted({
            imgId: imgData._id,
            subGalleryId: actionData.payload.subGalleryId,
          });
        }),
        catchError((errorRes) => {
          this.snackBarService.openSnackBar(
            "Virhe kuvan poistamisessa. Yritä uudelleen.",
            "warn-snackbar"
          );
          return of(new ImageActions.ImgDeleteCancelled());
        })
      );
    })
  );

  constructor(
    private readonly img: ImagesService,
    private readonly actions$: Actions,
    private readonly snackBarService: SnackBarService
  ) {}
}
