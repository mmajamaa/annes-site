import { Injectable } from "@angular/core";

import { of } from "rxjs";
import { Actions, ofType, Effect } from "@ngrx/effects";
import { switchMap, catchError, withLatestFrom, map } from "rxjs/operators";
import { Store } from "@ngrx/store";

import * as SubGalleryActions from "./sub-gallery.actions";
import * as SubGallerySelectors from "./sub-gallery.selectors";
import { SubGalleryService } from "./sub-gallery.service";
import { SubGallery } from "./sub-gallery";
import * as AuthSelectors from "../../auth/store/auth.selectors";
import { SnackBarService } from "src/app/annes-site/shared/snack-bar/snack-bar.service";
import * as ImageActions from "../image/image.actions";
import { Router } from "@angular/router";

@Injectable({ providedIn: "root" })
export class SubGalleryEffects {
  @Effect()
  subGalleriesRequested = this.actions$.pipe(
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
          .getSubGalleriesFromApi(actionData.payload.url)
          .pipe(
            switchMap((resData: SubGallery[]) => {
              let images = [];
              resData.map((sg) => (images = [...images, ...sg.images]));

              return [
                new ImageActions.ImgsLoaded({ images }),
                new SubGalleryActions.SubGalleriesLoaded({
                  subGalleries: resData,
                }),
              ];
            }),
            catchError((errorRes) => {
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
        let url = this.router.routerState.snapshot.url;
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
      return this.subGalleryService.updateSubGalleries(subGalleries).pipe(
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

        return this.subGalleryService
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
      return this.subGalleryService
        .deleteGallery(actionData.payload.subGalleryId)
        .pipe(
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

  @Effect()
  SubGalleriesPublishRequested = this.actions$.pipe(
    ofType(SubGalleryActions.SUB_GALLERIES_PUBLISH_REQUESTED),
    switchMap((actionData: SubGalleryActions.SubGalleriesPublishRequested) => {
      return this.subGalleryService.publishSubGalleries().pipe(
        map((res) => {
          this.snackBarService.openSnackBar(
            "Muutokset julkaistiin onnistuneesti.",
            "ok-snackbar"
          );
          return new SubGalleryActions.SubGalleriesPublishCompleted();
        }),
        catchError((erroRes) => {
          this.snackBarService.openSnackBar(
            "Virhe muutosten julkaisemisessa. Yritä uudelleen.",
            "warn-snackbar"
          );
          return of(new SubGalleryActions.SubGalleriesPublishCancelled());
        })
      );
    })
  );

  constructor(
    private actions$: Actions,
    private store: Store,
    private snackBarService: SnackBarService,
    private router: Router,
    private subGalleryService: SubGalleryService
  ) {}
}
