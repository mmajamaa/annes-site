import { Injectable } from "@angular/core";

import { of } from "rxjs";
import { Actions, ofType, Effect } from "@ngrx/effects";
import { switchMap, catchError, withLatestFrom, map } from "rxjs/operators";
import { Store } from "@ngrx/store";

import * as SubGalleryActions from "./sub-gallery.actions";
import * as SubGallerySelectors from "./sub-gallery.selectors";
import { ImagesService } from "src/app/components/shared/images.service";
import { SubGallery } from "../../../shared/sub-gallery";
import * as AuthSelectors from "../../../auth/store/auth.selectors";
import { SnackBarService } from "src/app/components/shared/snack-bar.service";

@Injectable({ providedIn: "root" })
export class SubGalleryEffects {
  @Effect()
  subGalleriesRequested = this.actions$.pipe(
    ofType(SubGalleryActions.SUB_GALLERIES_REQUESTED),
    switchMap((actionData: SubGalleryActions.SubGalleriesRequested) => {
      return this.img.getSubGalleriesFromApi().pipe(
        switchMap((resData: SubGallery[]) => [
          new SubGalleryActions.SubGalleriesLoaded({
            subGalleries: resData,
          }),
          new SubGalleryActions.SubGallerySelected({
            selectedSubGalleryId: resData[0]._id,
          }),
        ]),
        catchError((errorRes) => {
          return of(new SubGalleryActions.SubGalleriesCancelled());
        })
      );
    })
  );

  @Effect()
  subGalleriesUpdateToStoreRequested = this.actions$.pipe(
    ofType(SubGalleryActions.SUB_GALLERIES_UPDATE_TO_STORE_REQUESTED),
    withLatestFrom(this.store.select(AuthSelectors.isQuickSave)),
    map(([actionData, isQuickSave]) => {
      if (isQuickSave) {
        return new SubGalleryActions.SubGalleriesUpdateToAPIRequested();
      }
      return { type: "DUMMY" };
    })
  );

  @Effect()
  subGalleriesLoadedToStore = this.actions$.pipe(
    ofType(SubGalleryActions.SUB_GALLERIES_UPDATE_TO_API_REQUESTED),
    withLatestFrom(
      this.store.select(SubGallerySelectors.selectAllSubGalleries)
    ),
    switchMap(([actionData, subGalleries]) => {
      return this.img.updateSubGalleries(subGalleries).pipe(
        map((updatedSubGalleries: SubGallery[]) => {
          this.snackBarService.openSnackBar(
            "Muutokset tallennettiin onnistuneesti.",
            "ok-snackbar"
          );
          return new SubGalleryActions.SubGalleriesUpdateToAPICompleted();
        }),
        catchError((errorRes) => {
          this.snackBarService.openSnackBar(
            "Virhe muutosten tallentamisessa. Yritä uudelleen.",
            "warn-snackbar"
          );
          return of(new SubGalleryActions.SubGalleriesUpdateToAPICancelled());
        })
      );
    })
  );

  @Effect()
  ImgUploadRequested = this.actions$.pipe(
    ofType(SubGalleryActions.IMG_UPLOAD_REQUESTED),
    switchMap((actionData: SubGalleryActions.ImgUploadRequested) => {
      return this.img
        .uploadImage(
          actionData.payload.uploadObject,
          actionData.payload.subGalleryId
        )
        .pipe(
          map((imgData) => {
            return new SubGalleryActions.ImgUploadCompleted({ imgData });
          }),
          catchError((errorRes) => {
            return of(new SubGalleryActions.ImgUploadCancelled());
          })
        );
    })
  );

  constructor(
    private img: ImagesService,
    private actions$: Actions,
    private store: Store,
    private snackBarService: SnackBarService
  ) {}
}
