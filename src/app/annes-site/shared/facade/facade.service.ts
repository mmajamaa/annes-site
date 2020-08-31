import { Injectable } from "@angular/core";

import { Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { Update } from "@ngrx/entity";

import * as AuthActions from "../../auth/store/auth.actions";
import * as AuthSelectors from "../../auth/store/auth.selectors";
import * as SubGalleryActions from "../sub-gallery/sub-gallery.actions";
import * as SubGallerySelectors from "../sub-gallery/sub-gallery.selectors";
import * as ImageActions from "../image/image.actions";
import * as ImageSelectors from "../image/image.selectors";
import {
  SubGalleryImportObj,
  SubGalleryStoreObj,
} from "../sub-gallery/sub-gallery";
import { ImageUploadObj, ImageStoreObj } from "../image/image";

@Injectable({ "providedIn": "root" })
export class FacadeService {
  public constructor(private readonly store: Store) {}

  public autoLogin(): void {
    this.store.dispatch(new AuthActions.AutoLogin());
  }

  public loginStart(username: string, password: string): void {
    this.store.dispatch(new AuthActions.LoginStart({ username, password }));
  }

  public logoutRequested(): void {
    this.store.dispatch(new AuthActions.LogoutRequested());
  }

  public isLoggedIn(): Observable<boolean> {
    return this.store.select(AuthSelectors.isLoggedIn);
  }

  public subGalleriesRequested(url: string): void {
    return this.store.dispatch(
      new SubGalleryActions.SubGalleriesRequested({ url })
    );
  }

  public selectSubGalleries(): Observable<SubGalleryImportObj[]> {
    return this.store.select(SubGallerySelectors.selectAllSubGalleries);
  }

  public selectSubGallery(selectedSubGalleryId: string): void {
    this.store.dispatch(
      new SubGalleryActions.SubGallerySelected({ selectedSubGalleryId })
    );
  }

  public getSelectedSubGallery(): Observable<SubGalleryImportObj> {
    return this.store.select(SubGallerySelectors.selectCurrentSubGallery);
  }

  public subGalleriesUpdateToStoreRequested(
    subGalleries: Update<SubGalleryStoreObj>[]
  ): void {
    this.store.dispatch(
      new SubGalleryActions.SubGalleriesUpdateToStoreRequested({
        subGalleries,
      })
    );
  }

  public subGalleriesPublishRequested(): void {
    this.store.dispatch(new SubGalleryActions.SubGalleriesPublishRequested());
  }

  public imgUploadRequested(
    uploadObject: ImageUploadObj,
    subGalleryId: string
  ): void {
    this.store.dispatch(
      new ImageActions.ImgUploadRequested({
        uploadObject,
        subGalleryId,
      })
    );
  }

  // TODO: rename/change state's field's type
  public getIsUploadingImg(): Observable<string> {
    return this.store.select(ImageSelectors.isUploadingImg);
  }

  public deleteImgRequested(imgId: string, subGalleryId: string): void {
    this.store.dispatch(
      new ImageActions.ImgDeleteRequested({ imgId, subGalleryId })
    );
  }

  public createSubGalleryRequested(fi: string, en: string): void {
    this.store.dispatch(
      new SubGalleryActions.SubGalleryCreateRequested({ fi, en })
    );
  }

  public subGalleryDeleteRequested(subGalleryId: string): void {
    this.store.dispatch(
      new SubGalleryActions.SubGalleryDeleteRequested({ subGalleryId })
    );
  }

  public getIsSubGalleryCreated(): Observable<boolean> {
    return this.store.select(SubGallerySelectors.isSubGalleryCreated);
  }

  public imagesUpdateToStoreRequested(images: Update<ImageStoreObj>[]): void {
    return this.store.dispatch(
      new ImageActions.ImgsUpdateToStoreRequested({ images })
    );
  }
}
