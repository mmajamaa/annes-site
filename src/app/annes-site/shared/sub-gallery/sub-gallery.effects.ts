import { Injectable } from "@angular/core";

import { of } from "rxjs";
import { Actions, ofType, Effect } from "@ngrx/effects";
import { switchMap, catchError, withLatestFrom, map } from "rxjs/operators";
import { Store } from "@ngrx/store";

import * as SubGalleryActions from "./sub-gallery.actions";
import * as SubGallerySelectors from "./sub-gallery.selectors";
import { ImagesService } from "src/app/annes-site/shared/image/image.service";
import { SubGallery } from "./sub-gallery";
import * as AuthSelectors from "../../auth/store/auth.selectors";
import { SnackBarService } from "src/app/annes-site/shared/snack-bar/snack-bar.service";
import * as ImageActions from "../image/image.actions";

@Injectable({ providedIn: "root" })
export class SubGalleryEffects {
  @Effect()
  subGalleriesRequested = this.actions$.pipe(
    ofType(SubGalleryActions.SUB_GALLERIES_REQUESTED),
    switchMap((actionData: SubGalleryActions.SubGalleriesRequested) => {
      return this.img.getSubGalleriesFromApi(actionData.payload.url).pipe(
        switchMap((resData: SubGallery[]) => {
          let images = [];
          resData.map((sg) => (images = [...images, ...sg.images]));

          return [
            new ImageActions.ImgsLoaded({ images }),
            new SubGalleryActions.SubGalleriesLoaded({
              subGalleries: resData,
            }),
            new SubGalleryActions.SubGallerySelected({
              selectedSubGalleryId: resData[0]._id,
            }),
          ];
        }),
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
            return of(new SubGalleryActions.SubGalleryCreateCancelled());
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
