import { Injectable } from "@angular/core";

import { Store } from "@ngrx/store";
import { Observable } from "rxjs";

import * as AuthActions from "../auth/store/auth.actions";
import * as AuthSelectors from "../auth/store/auth.selectors";
import * as SubGalleryActions from "../public/sub-gallery/store/sub-gallery.actions";
import * as SubGallerySelectors from "../public/sub-gallery/store/sub-gallery.selectors";
import * as ImageActions from "../shared/images/images.actions";
import * as ImageSelectors from "../shared/images/images.selectors";

@Injectable({ providedIn: "root" })
export class FacadeService {
  constructor(private store: Store) {}

  autoLogin() {
    this.store.dispatch(new AuthActions.AutoLogin());
  }

  loginStart(username: string, password: string) {
    this.store.dispatch(
      new AuthActions.LoginStart({ username: username, password: password })
    );
  }

  logoutRequested() {
    this.store.dispatch(new AuthActions.LogoutRequested());
  }

  isLoggedIn(): Observable<boolean> {
    return this.store.select(AuthSelectors.isLoggedIn);
  }

  subGalleriesRequested(url: string) {
    return this.store.dispatch(
      new SubGalleryActions.SubGalleriesRequested({ url })
    );
  }

  selectSubGalleries() {
    return this.store.select(SubGallerySelectors.selectAllSubGalleries);
  }

  selectSubGallery(selectedSubGalleryId: string) {
    this.store.dispatch(
      new SubGalleryActions.SubGallerySelected({ selectedSubGalleryId })
    );
  }

  getSelectedSubGallery() {
    return this.store.select(SubGallerySelectors.selectCurrentSubGallery);
  }

  subGalleriesUpdateToStoreRequested(subGalleries) {
    this.store.dispatch(
      new SubGalleryActions.SubGalleriesUpdateToStoreRequested({
        subGalleries: subGalleries,
      })
    );
  }

  subGalleriesUpdateToAPIRequested() {
    this.store.dispatch(
      new SubGalleryActions.SubGalleriesUpdateToAPIRequested()
    );
  }

  imgUploadRequested(uploadObject, subGalleryId) {
    this.store.dispatch(
      new ImageActions.ImgUploadRequested({
        uploadObject,
        subGalleryId,
      })
    );
  }

  getIsUploadingImg() {
    return this.store.select(ImageSelectors.isUploadingImg);
  }

  deleteImgRequested(imgId, subGalleryId) {
    this.store.dispatch(
      new ImageActions.ImgDeleteRequested({ imgId, subGalleryId })
    );
  }

  createSubGalleryRequested(fi: string, en: string) {
    this.store.dispatch(
      new SubGalleryActions.SubGalleryCreateRequested({ fi, en })
    );
  }

  subGalleryDeleteRequested(subGalleryId: string) {
    this.store.dispatch(
      new SubGalleryActions.SubGalleryDeleteRequested({ subGalleryId })
    );
  }

  getIsSubGalleryCreated() {
    return this.store.select(SubGallerySelectors.isSubGalleryCreated);
  }

  imagesUpdateToStoreRequested(images) {
    return this.store.dispatch(
      new ImageActions.ImgsUpdateToStoreRequested({ images })
    );
  }
}
