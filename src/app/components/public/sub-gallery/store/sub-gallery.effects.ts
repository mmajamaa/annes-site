import { Injectable } from "@angular/core";

import { of } from 'rxjs';
import { Actions, ofType, Effect } from '@ngrx/effects';
import { switchMap, catchError } from 'rxjs/operators';

import * as SubGalleryActions from './sub-gallery.actions';
import { ImagesService } from 'src/app/components/shared/images.service';
import { SubGallery } from '../../../shared/sub-gallery';


@Injectable({ providedIn: 'root' })
export class SubGalleryEffects {
    @Effect()
    subGalleriesRequested = this.actions$.pipe(
        ofType(SubGalleryActions.SUB_GALLERIES_REQUESTED),
        switchMap((actionData: SubGalleryActions.SubGalleriesRequested) => {
            return this.img.getSubGalleriesFromApi()
                .pipe(
                    switchMap((resData: SubGallery[]) =>
                        [
                            new SubGalleryActions.SubGalleriesLoaded({
                                subGalleries: resData
                            }),
                            new SubGalleryActions.SubGallerySelected({
                                selectedSubGalleryId: resData[0]._id
                            })
                        ]

                    ),
                    catchError(errorRes => {
                        return of(new SubGalleryActions.SubGalleriesCancelled());
                    }));
        })
    )

    constructor(private img: ImagesService, private actions$: Actions) { }
}