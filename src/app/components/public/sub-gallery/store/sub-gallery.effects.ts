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
  subGalleriesLoadToStoreRequested = this.actions$.pipe(
    ofType(SubGalleryActions.SUB_GALLERIES_UPDATE_REQUESTED),
    map((actionData) => {
      return new SubGalleryActions.SubGalleriesUpdatedToStore();
    })
  );

  @Effect({ dispatch: false })
  subGalleriesLoadedToStore = this.actions$.pipe(
    ofType(SubGalleryActions.SUB_GALLERIES_UPDATED_TO_STORE),
    withLatestFrom(
      this.store.select(SubGallerySelectors.selectAllSubGalleries),
      this.store.select(AuthSelectors.isQuickSave)
    ),
    map(([actionData, subGalleries, isQuickSave]) => {
      if (isQuickSave) {
        this.img.updateSubGalleries(subGalleries);
      }
    })
  );

  constructor(
    private img: ImagesService,
    private actions$: Actions,
    private store: Store
  ) {}
}
