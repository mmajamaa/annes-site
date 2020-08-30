import { Injectable } from "@angular/core";
import { Router } from "@angular/router";

import { of, Observable } from "rxjs";
import { Actions, ofType, Effect } from "@ngrx/effects";
import { switchMap, catchError, withLatestFrom, map } from "rxjs/operators";
import { Store } from "@ngrx/store";

import * as SubGalleryActions from "./sub-gallery.actions";
import * as SubGallerySelectors from "./sub-gallery.selectors";
import { SubGalleryService } from "./sub-gallery.service";
import {
  SubGalleryImportObj,
  SubGalleryStoreObj,
  SubGalleryChanges,
} from "./sub-gallery";
import * as AuthSelectors from "../../auth/store/auth.selectors";
import { SnackBarService } from "src/app/annes-site/shared/snack-bar/snack-bar.service";
import * as ImageActions from "../image/image.actions";
import { ImageStoreObj } from "../image/image";

@Injectable({ "providedIn": "root" })
export class SubGalleryEffects {
  @Effect()
  public subGalleriesRequested: Observable<
    | SubGalleryActions.SubGalleriesLoaded
    | ImageActions.ImgsLoaded
    | SubGalleryActions.SubGalleriesCancelled
  > = this.actions$.pipe(
    ofType(SubGalleryActions.SUB_GALLERIES_REQUESTED),
    withLatestFrom(
      this.store.select(SubGallerySelectors.subGalleriesLoaded),
      this.store.select(SubGallerySelectors.selectCurrentSubGalleryName)
    ),
    switchMap(
      ([actionData, subGalleriesLoaded, selectedSubGalleryName]: [
        SubGalleryActions.SubGalleriesRequested,
        boolean,
        string
      ]) => {
        if (subGalleriesLoaded) {
          this.router.navigate([
            `/gallery/${selectedSubGalleryName.toLowerCase()}`,
          ]);
          return of(new SubGalleryActions.SubGalleriesCancelled());
        }
        return this.subGalleryService
          .getSubGalleries(actionData.payload.url)
          .pipe(
            switchMap((resData: SubGalleryImportObj[]) => {
              let images: ImageStoreObj[] = [];
              resData.map(
                (sg: SubGalleryImportObj) =>
                  (images = [...images, ...sg.images])
              );

              return [
                new ImageActions.ImgsLoaded({ images }),
                new SubGalleryActions.SubGalleriesLoaded({
                  "subGalleries": resData,
                }),
              ];
            }),
            catchError((errorRes: Error) => {
              return of(new SubGalleryActions.SubGalleriesCancelled());
            })
          );
      }
    )
  );

  @Effect()
  subGalleriesLoaded = this.actions$.pipe(
    ofType(SubGalleryActions.SUB_GALLERIES_LOADED),
    withLatestFrom(
      this.store.select(SubGallerySelectors.selectCurrentSubGalleryName)
    ),
    map(
      ([actionData, selectedSubGalleryName]: [
        SubGalleryActions.SubGalleriesLoaded,
        string
      ]) => {
        const url: string = this.router.routerState.snapshot.url;
        let subGalleryToViewIdx: number = 0;

        if (url === "/gallery" && !selectedSubGalleryName) {
          this.router.navigate([
            `/gallery/${actionData.payload.subGalleries[
              subGalleryToViewIdx
            ].en.toLowerCase()}`,
          ]);
          return new SubGalleryActions.SubGallerySelected({
            selectedSubGalleryId:
              actionData.payload.subGalleries[subGalleryToViewIdx]._id,
          });
        } else if (url === "/gallery" && selectedSubGalleryName) {
          this.router.navigate([
            `/gallery/${selectedSubGalleryName.toLowerCase()}`,
          ]);
          return { type: "DUMMY" };
        }

        let subGalleryToViewName = "";

        subGalleryToViewName = url.split("/")[2];
        let subGalleryNames = actionData.payload.subGalleries.map((sg) =>
          sg.en.toLowerCase()
        );
        subGalleryToViewIdx = subGalleryNames.indexOf(subGalleryToViewName);

        if (subGalleryToViewIdx > -1) {
          return new SubGalleryActions.SubGallerySelected({
            selectedSubGalleryId:
              actionData.payload.subGalleries[subGalleryToViewIdx]._id,
          });
        } else {
          this.router.navigate(["/page-not-found"]);
          return new SubGalleryActions.SubGallerySelected({
            selectedSubGalleryId: actionData.payload.subGalleries[0]._id,
          });
        }
      }
    )
  );

  @Effect()
  subGalleriesUpdateToStoreRequested = this.actions$.pipe(
    ofType(SubGalleryActions.SUB_GALLERIES_UPDATE_TO_STORE_REQUESTED),
    withLatestFrom(this.store.select(AuthSelectors.isQuickSave)),
    map(
      ([actionData, isQuickSave]: [
        SubGalleryActions.SubGalleriesUpdateToStoreRequested,
        boolean
      ]) => {
        if (isQuickSave) {
          return new SubGalleryActions.SubGalleriesUpdateToAPIRequested({
            "subGalleries": actionData.payload
              .subGalleries as SubGalleryChanges[],
          });
        }

        return { "type": "DUMMY" };
      }
    )
  );

  @Effect()
  subGalleriesLoadedToStore = this.actions$.pipe(
    // TODO: RENAME
    ofType(SubGalleryActions.SUB_GALLERIES_UPDATE_TO_API_REQUESTED),
    withLatestFrom(
      this.store.select(SubGallerySelectors.selectAllSubGalleries)
    ),
    switchMap(
      ([actionData, subGalleries]: [
        SubGalleryActions.SubGalleriesUpdateToStoreRequested,
        SubGalleryImportObj[]
      ]) => {
        return this.subGalleryService
          .putSubGalleries(
            actionData.payload.subGalleries as SubGalleryChanges[]
          )
          .pipe(
            map((res) => {
              this.snackBarService.openSnackBar(
                "Muutokset tallennettiin onnistuneesti.",
                "ok-snackbar"
              );

              return new SubGalleryActions.SubGalleriesUpdateToAPICompleted();
            }),
            catchError((errorRes: Error) => {
              this.snackBarService.openSnackBar(
                "Virhe muutosten tallentamisessa. Yritä uudelleen.",
                "warn-snackbar"
              );

              return of(
                new SubGalleryActions.SubGalleriesUpdateToAPICancelled()
              );
            })
          );
      }
    )
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
        SubGalleryImportObj[]
      ]) => {
        for (let i = 0; i < subGalleries.length; i++) {
          if (
            subGalleries[i].fi === actionData.payload.fi ||
            subGalleries[i].en === actionData.payload.en
          ) {
            this.snackBarService.openSnackBar(
              "Virhe gallerien luomisessa. Saman niminen galleria on jo olemassa.",
              "warn-snackbar"
            );

            return of(new SubGalleryActions.SubGalleryCreateCancelled());
          }
        }

        return this.subGalleryService
          .postSubGallery(actionData.payload.fi, actionData.payload.en)
          .pipe(
            map((subGalleryData: SubGalleryStoreObj) => {
              this.snackBarService.openSnackBar(
                "Galleria luotiin onnistuneesti.",
                "ok-snackbar"
              );

              return new SubGalleryActions.SubGalleryCreateCompleted({
                "subGallery": subGalleryData,
              });
            }),
            catchError(() => {
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
      return this.subGalleryService
        .deleteSubGallery(actionData.payload.subGalleryId)
        .pipe(
          map((deletedSubGallery: SubGalleryStoreObj) => {
            this.snackBarService.openSnackBar(
              "Galleria poistettiin onnistuneesti.",
              "ok-snackbar"
            );

            return new SubGalleryActions.SubGalleryDeleteCompleted({
              "subGalleryId": deletedSubGallery._id,
            });
          }),
          catchError(() => {
            this.snackBarService.openSnackBar(
              "Virhe gallerien poistamisessa. Yritä uudelleen.",
              "warn-snackbar"
            );

            return of(new SubGalleryActions.SubGalleryDeleteCancelled());
          })
        );
    })
  );

  @Effect()
  SubGalleriesPublishRequested = this.actions$.pipe(
    ofType(SubGalleryActions.SUB_GALLERIES_PUBLISH_REQUESTED),
    switchMap(() => {
      return this.subGalleryService.publishSubGalleries().pipe(
        map(() => {
          this.snackBarService.openSnackBar(
            "Muutokset julkaistiin onnistuneesti.",
            "ok-snackbar"
          );

          return new SubGalleryActions.SubGalleriesPublishCompleted();
        }),
        catchError(() => {
          this.snackBarService.openSnackBar(
            "Virhe muutosten julkaisemisessa. Yritä uudelleen.",
            "warn-snackbar"
          );

          return of(new SubGalleryActions.SubGalleriesPublishCancelled());
        })
      );
    })
  );

  public constructor(
    private readonly actions$: Actions,
    private readonly store: Store,
    private readonly snackBarService: SnackBarService,
    private readonly router: Router,
    private readonly subGalleryService: SubGalleryService
  ) {}
}
