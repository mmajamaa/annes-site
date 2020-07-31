import { Action } from "@ngrx/store";
import { Update } from "@ngrx/entity";

import { SubGallery } from "../../../shared/sub-gallery";

export const SUB_GALLERIES_REQUESTED =
  "[] Sub galleries requested from the API.";
export const SUB_GALLERIES_LOADED = "[] Sub galleries loaded from the API.";
export const SUB_GALLERIES_CANCELLED =
  "[] Loading sub galleries from the API failed.";
export const SUB_GALLERIES_SAVE_REQUESTED =
  "[Admin Component] Save sub galleries requested.";
export const SUB_GALLERIES_SAVED = "[] Saving sub galleries succeeded.";
export const SUB_GALLERIES_SAVE_CANCELLED = "[] Failed to save sub galleries.";
export const SUB_GALLERY_SELECTED = "[Gallery Component] Sub gallery selected.";
export const SUB_GALLERIES_UPDATE_TO_STORE_REQUESTED =
  "[Admin Component] Sub galleries update requested";
export const SUB_GALLERIES_UPDATE_TO_STORE_COMPLETED =
  "[] Sub galleries updated to store.";
export const SUB_GALLERIES_UPDATE_TO_API_REQUESTED =
  "[] Sub galleries update to API requested.";
export const SUB_GALLERIES_UPDATE_TO_API_COMPLETED =
  "[Sub Gallery Effects] Sub galleries updated to API.";
export const SUB_GALLERIES_UPDATE_TO_API_CANCELLED =
  "[Sub Gallery Effects] Sub galleries update to API cancelled.";
export const CREATE_SUB_GALLERY_REQUESTED = "[] Create sub gallery requested.";
export const CREATE_SUB_GALLERY_COMPLETED = "[] Create sub gallery completed.";
export const CREATE_SUB_GALLERY_CANCELLED = "[] Create sub gallery cancelled.";
// image actions (move to it's own file?)
export const IMG_UPLOAD_REQUESTED = "[] Image upload requested.";
export const IMG_UPLOAD_COMPLETED = "[] Image upload completed.";
export const IMG_UPLOAD_CANCELLED = "[] Image upload cancelled.";
export const RESET_UPLOADING_IMG = "[] Reset uploading image.";
export const IMG_DELETE_REQUESTED = "[] Image delete requested.";
export const IMG_DELETE_COMPLETED = "[] Image delete completed.";
export const IMG_DELETE_CANCELLED = "[] Image delete cancelled.";

export class SubGalleriesRequested implements Action {
  public readonly type = SUB_GALLERIES_REQUESTED;
}

export class SubGalleriesLoaded implements Action {
  public readonly type = SUB_GALLERIES_LOADED;
  constructor(public payload: { subGalleries: SubGallery[] }) {}
}

export class SubGalleriesCancelled implements Action {
  public readonly type = SUB_GALLERIES_SAVE_CANCELLED;
}

export class SubGalleriesSaveRequested implements Action {
  public readonly type = SUB_GALLERIES_SAVE_REQUESTED;
}

export class SubGalleriesSaved implements Action {
  public readonly type = SUB_GALLERIES_SAVED;
}

export class SubGalleriesSaveCancelled implements Action {
  public readonly type = SUB_GALLERIES_SAVE_CANCELLED;
}

export class SubGallerySelected implements Action {
  public readonly type = SUB_GALLERY_SELECTED;
  public constructor(public payload: { selectedSubGalleryId: string }) {}
}

export class SubGalleriesUpdateToStoreRequested implements Action {
  public readonly type = SUB_GALLERIES_UPDATE_TO_STORE_REQUESTED;
  public constructor(public payload: { subGalleries: Update<SubGallery>[] }) {}
}

export class SubGalleriesUpdateToStoreCompleted implements Action {
  public readonly type = SUB_GALLERIES_UPDATE_TO_STORE_COMPLETED;
}

export class SubGalleriesUpdateToAPIRequested implements Action {
  public readonly type = SUB_GALLERIES_UPDATE_TO_API_REQUESTED;
}

export class SubGalleriesUpdateToAPICompleted implements Action {
  public readonly type = SUB_GALLERIES_UPDATE_TO_API_COMPLETED;
}

export class SubGalleriesUpdateToAPICancelled implements Action {
  public readonly type = SUB_GALLERIES_UPDATE_TO_API_CANCELLED;
}

export class ImgUploadRequested implements Action {
  public readonly type = IMG_UPLOAD_REQUESTED;
  public constructor(
    public payload: { uploadObject: any; subGalleryId: string }
  ) {}
}

export class ImgUploadCompleted implements Action {
  public readonly type = IMG_UPLOAD_COMPLETED;
  public constructor(public payload: { imgData: any }) {}
}

export class ImgUploadCancelled implements Action {
  public readonly type = IMG_UPLOAD_CANCELLED;
}

export class ResetUploadingImg implements Action {
  public readonly type = RESET_UPLOADING_IMG;
}

export class ImgDeleteRequested implements Action {
  public readonly type = IMG_DELETE_REQUESTED;
  public constructor(public payload: { imgId: string }) {}
}

export class ImgDeleteCompleted implements Action {
  public readonly type = IMG_DELETE_COMPLETED;
  public constructor(public payload: { imgId: string; subGalleryId: string }) {}
}

export class ImgDeleteCancelled implements Action {
  public readonly type = IMG_DELETE_CANCELLED;
}

export class CreateSubGalleryRequested implements Action {
  public readonly type = CREATE_SUB_GALLERY_REQUESTED;
  public constructor(public payload: { fi: string; en: string }) {}
}

export class CreateSubGalleryCompleted implements Action {
  public readonly type = CREATE_SUB_GALLERY_COMPLETED;
  public constructor(public payload: { subGallery: SubGallery }) {}
}

export class CreateSubGalleryCancelled implements Action {
  public readonly type = CREATE_SUB_GALLERY_CANCELLED;
}

export type SubGalleryActions =
  | SubGalleriesRequested
  | SubGalleriesLoaded
  | SubGalleriesSaveCancelled
  | SubGalleriesSaveRequested
  | SubGalleriesSaved
  | SubGalleriesSaveCancelled
  | SubGallerySelected
  | SubGalleriesUpdateToStoreRequested
  | SubGalleriesUpdateToStoreCompleted
  | SubGalleriesUpdateToAPIRequested
  | SubGalleriesUpdateToAPICompleted
  | SubGalleriesUpdateToAPICancelled
  | ImgUploadRequested
  | ImgUploadCompleted
  | ImgUploadCancelled
  | ResetUploadingImg
  | ImgDeleteRequested
  | ImgDeleteCompleted
  | ImgDeleteCancelled
  | CreateSubGalleryRequested
  | CreateSubGalleryCompleted
  | CreateSubGalleryCancelled;
