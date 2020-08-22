import { Action } from "@ngrx/store";

import { Image } from "./image";
import { Update } from "@ngrx/entity";

export const IMG_UPLOAD_REQUESTED = "[] Image upload requested.";
export const IMG_UPLOAD_COMPLETED = "[] Image upload completed.";
export const IMG_UPLOAD_CANCELLED = "[] Image upload cancelled.";
export const RESET_UPLOADING_IMG = "[] Reset uploading image.";
export const IMG_DELETE_REQUESTED = "[] Image delete requested.";
export const IMG_DELETE_COMPLETED = "[] Image delete completed.";
export const IMG_DELETE_CANCELLED = "[] Image delete cancelled.";
export const IMGS_LOADED = "[] Images loaded";
export const IMGS_UPDATE_TO_STORE_REQUESTED =
  "[] Image update to store requested";

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
  public constructor(public payload: { imgId: string; subGalleryId: string }) {}
}

export class ImgDeleteCompleted implements Action {
  public readonly type = IMG_DELETE_COMPLETED;
  public constructor(public payload: { imgId: string; subGalleryId: string }) {}
}

export class ImgDeleteCancelled implements Action {
  public readonly type = IMG_DELETE_CANCELLED;
}

export class ImgsLoaded implements Action {
  public readonly type = IMGS_LOADED;
  public constructor(public payload: { images: Image[] }) {}
}

export class ImgsUpdateToStoreRequested implements Action {
  public readonly type = IMGS_UPDATE_TO_STORE_REQUESTED;
  public constructor(public payload: { images: Update<Image>[] }) {}
}

export type ImageActions =
  | ImgUploadRequested
  | ImgUploadCompleted
  | ImgUploadCancelled
  | ResetUploadingImg
  | ImgDeleteRequested
  | ImgDeleteCompleted
  | ImgDeleteCancelled
  | ImgsLoaded
  | ImgsUpdateToStoreRequested;
