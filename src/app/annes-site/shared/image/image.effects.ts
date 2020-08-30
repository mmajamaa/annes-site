import { Injectable } from "@angular/core";

import { Store } from "@ngrx/store";
import { Actions, ofType, Effect } from "@ngrx/effects";
import { of } from "rxjs";
import { switchMap, catchError, map, withLatestFrom } from "rxjs/operators";

import { SnackBarService } from "../snack-bar/snack-bar.service";
import * as ImageActions from "./image.actions";
import { ImagesService } from "./image.service";
import * as AuthSelectors from "../../auth/store/auth.selectors";
import { ImageChanges } from "./image";

@Injectable({ providedIn: "root" })
export class ImageEffetcs {
  @Effect()
  ImgUploadRequested = this.actions$.pipe(
    ofType(ImageActions.IMG_UPLOAD_REQUESTED),
    switchMap((actionData: ImageActions.ImgUploadRequested) => {
      return this.img
        .postImage(
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

  @Effect()
  ImgUpdateToAPIRequested = this.actions$.pipe(
    ofType(ImageActions.IMGS_UPDATE_TO_STORE_REQUESTED),
    withLatestFrom(this.store.select(AuthSelectors.isQuickSave)),
    switchMap(
      ([actionData, isQuickSave]: [
        ImageActions.ImgsUpdateToStoreRequested,
        boolean
      ]) => {
        if (!isQuickSave) {
          return of(new ImageActions.ImgsUpdateToAPICancelled());
        }
        return this.img
          .putImages(actionData.payload.images as ImageChanges[])
          .pipe(
            map(() => {
              this.snackBarService.openSnackBar(
                "Muutokset tallennettiin onnistuneesti.",
                "ok-snackbar"
              );
              return new ImageActions.ImgsUpdateToAPICompleted();
            }),
            catchError(() => {
              this.snackBarService.openSnackBar(
                "Virhe muutosten tallentamisessa. Yritä uudelleen.",
                "warn-snackbar"
              );

              return of(new ImageActions.ImgsUpdateToAPICancelled());
            })
          );
      }
    )
  );

  constructor(
    private readonly img: ImagesService,
    private readonly actions$: Actions,
    private readonly snackBarService: SnackBarService,
    private readonly store: Store
  ) {}
}
