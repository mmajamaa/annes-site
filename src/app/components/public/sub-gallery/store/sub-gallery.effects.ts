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
            this.snackBarService.openSnackBar(
              "Kuva ladattiin onnistuneesti.",
              "ok-snackbar"
            );
            return new SubGalleryActions.ImgUploadCompleted({ imgData });
          }),
          catchError((errorRes) => {
            this.snackBarService.openSnackBar(
              "Virhe kuvan lataamisessa. Yritä uudestaan.",
              "warn-snackbar"
            );
            return of(new SubGalleryActions.ImgUploadCancelled());
          })
        );
    }),
    switchMap((action) => [action, new SubGalleryActions.ResetUploadingImg()])
  );

  @Effect()
  ImgDeleteRequested = this.actions$.pipe(
    ofType(SubGalleryActions.IMG_DELETE_REQUESTED),
    switchMap((actionData: SubGalleryActions.ImgDeleteRequested) => {
      return this.img.deleteImage(actionData.payload.imgId).pipe(
        map((imgData: any) => {
          this.snackBarService.openSnackBar(
            "Kuva poistettiin onnistuneesti.",
            "ok-snackbar"
          );
          return new SubGalleryActions.ImgDeleteCompleted({
            imgId: imgData._id,
            subGalleryId: imgData.gallery,
          });
        }),
        catchError((errorRes) => {
          this.snackBarService.openSnackBar(
            "Virhe kuvan poistamisessa. Yritä uudelleen.",
            "warn-snackbar"
          );
          return of(new SubGalleryActions.ImgDeleteCancelled());
        })
      );
    })
  );

  @Effect()
  CreateSubGalleryRequested = this.actions$.pipe(
    ofType(SubGalleryActions.SUB_GALLERY_CREATE_REQUESTED),
    withLatestFrom(
      this.store.select(SubGallerySelectors.selectAllSubGalleries)
    ),
    switchMap(
      ([actionData, subGalleries]: [
        SubGalleryActions.SubGalleryCreateRequested,
        any[]
      ]) => {
        for (let i = 0; i < subGalleries.length; i++) {
          if (
            subGalleries[i].fi == actionData.payload.fi ||
            subGalleries[i].en == actionData.payload.en
          ) {
            this.snackBarService.openSnackBar(
              "Virhe gallerien luomisessa. Saman niminen galleria on jo olemassa.",
              "warn-snackbar"
            );
            return of(new SubGalleryActions.ImgDeleteCancelled());
          }
        }

        return this.img
          .createGallery(actionData.payload.fi, actionData.payload.en)
          .pipe(
            map((subGalleryData: any) => {
              this.snackBarService.openSnackBar(
                "Galleria luotiin onnistuneesti.",
                "ok-snackbar"
              );
              return new SubGalleryActions.SubGalleryCreateCompleted({
                subGallery: subGalleryData,
              });
            }),
            catchError((errorRes) => {
              this.snackBarService.openSnackBar(
                "Virhe gallerien luomisessa.",
                "warn-snackbar"
              );
              return of(new SubGalleryActions.SubGalleryCreateCancelled());
            })
          );
      }
    )
  );

  @Effect()
  SubGalleryDeleteRequested = this.actions$.pipe(
    ofType(SubGalleryActions.SUB_GALLERY_DELETE_REQUESTED),
    switchMap((actionData: SubGalleryActions.SubGalleryDeleteRequested) => {
      return this.img.deleteGallery(actionData.payload.subGalleryId).pipe(
        map((deletedSubGallery: SubGallery) => {
          this.snackBarService.openSnackBar(
            "Galleria poistettiin onnistuneesti.",
            "ok-snackbar"
          );
          return new SubGalleryActions.SubGalleryDeleteCompleted({
            subGalleryId: deletedSubGallery._id,
          });
        }),
        catchError((erroRes) => {
          this.snackBarService.openSnackBar(
            "Virhe gallerien poistamisessa. Yritä uudelleen.",
            "warn-snackbar"
          );
          return of(new SubGalleryActions.SubGalleryDeleteCancelled());
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
