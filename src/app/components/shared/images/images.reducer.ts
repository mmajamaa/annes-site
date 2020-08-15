import { EntityState, EntityAdapter, createEntityAdapter } from "@ngrx/entity";

import { Image } from "../image";
import * as ImageActions from "./images.actions";

export interface State extends EntityState<Image> {
  images: Image[];
  uploadingImgStatus: string;
}

export function compareBySo(a, b) {
  return a.so - b.so;
}

export const adapter: EntityAdapter<Image> = createEntityAdapter<Image>({
  selectId: (image) => image._id,
  sortComparer: compareBySo,
});

export const initialState: State = adapter.getInitialState({
  images: [],
  uploadingImgStatus: null,
});

export function imageReducer(
  state = initialState,
  action: ImageActions.ImageActions
) {
  switch (action.type) {
    case ImageActions.IMGS_UPDATE_TO_STORE_REQUESTED:
      return adapter.updateMany(action.payload.images, state);
    case ImageActions.IMG_UPLOAD_COMPLETED:
      return adapter.addOne(action.payload.imgData, {
        ...state,
        uploadingImgStatus: "completed",
      });
    case ImageActions.IMG_UPLOAD_CANCELLED:
      return { ...state, uploadingImgStatus: "cancelled" };
    case ImageActions.RESET_UPLOADING_IMG:
      return { ...state, uploadingImgStatus: null };
    case ImageActions.IMG_DELETE_COMPLETED:
      return adapter.removeOne(action.payload.imgId, state);
    case ImageActions.IMGS_LOADED:
      return adapter.addMany(action.payload.images, state);
    default:
      return state;
  }
}

export const { selectAll } = adapter.getSelectors();

export const getUploadingImgStatus = (state: State) => state.uploadingImgStatus;
