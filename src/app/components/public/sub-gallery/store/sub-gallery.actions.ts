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
export const SUB_GALLERY_CREATE_REQUESTED = "[] Create sub gallery requested."; // TODO: rename
export const SUB_GALLERY_CREATE_COMPLETED = "[] Create sub gallery completed.";
export const SUB_GALLERY_CREATE_CANCELLED = "[] Create sub gallery cancelled.";
export const SUB_GALLERY_DELETE_REQUESTED = "[] Sub gallery delete requested.";
export const SUB_GALLERY_DELETE_COMPLETED = "[] Sub gallery delete completed.";
export const SUB_GALLERY_DELETE_CANCELLED = "[] Sub gallery delete cancelled.";

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

export class SubGalleryCreateRequested implements Action {
  public readonly type = SUB_GALLERY_CREATE_REQUESTED;
  public constructor(public payload: { fi: string; en: string }) {}
}

export class SubGalleryCreateCompleted implements Action {
  public readonly type = SUB_GALLERY_CREATE_COMPLETED;
  public constructor(public payload: { subGallery: SubGallery }) {}
}

export class SubGalleryCreateCancelled implements Action {
  public readonly type = SUB_GALLERY_CREATE_CANCELLED;
}

export class SubGalleryDeleteRequested implements Action {
  public readonly type = SUB_GALLERY_DELETE_REQUESTED;
  public constructor(public payload: { subGalleryId: string }) {}
}

export class SubGalleryDeleteCompleted implements Action {
  public readonly type = SUB_GALLERY_DELETE_COMPLETED;
  public constructor(public payload: { subGalleryId: string }) {}
}

export class SubGalleryDeleteCancelled implements Action {
  public readonly type = SUB_GALLERY_DELETE_CANCELLED;
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
  | SubGalleryCreateRequested
  | SubGalleryCreateCompleted
  | SubGalleryCreateCancelled
  | SubGalleryDeleteRequested
  | SubGalleryDeleteCompleted
  | SubGalleryDeleteCancelled;
