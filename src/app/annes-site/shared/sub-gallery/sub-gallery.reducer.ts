import { createEntityAdapter, EntityAdapter, EntityState } from "@ngrx/entity";
import {
  SubGalleryStoreObj,
  SubGalleryImportObj,
} from "src/app/annes-site/shared/sub-gallery/sub-gallery";
import * as ImageActions from "../image/image.actions";
import * as SubGalleryActions from "./sub-gallery.actions";
import { ImageStoreObj } from "../image/image";

export interface State extends EntityState<SubGalleryStoreObj> {
  selectedSubGalleryId: string | undefined;
  subGalleries: SubGalleryStoreObj[];
  subGalleryCreated: boolean;
  subGalleriesLoaded: boolean;
}

export function compareBySo(a, b) {
  return a.so - b.so;
}

const adapter: EntityAdapter<SubGalleryStoreObj> = createEntityAdapter<
  SubGalleryStoreObj
>({
  selectId: (subGallery) => subGallery._id,
  sortComparer: compareBySo,
});

export const initialState: State = adapter.getInitialState({
  "selectedSubGalleryId": undefined,
  "subGalleries": [],
  "subGalleryCreated": undefined,
  "subGalleriesLoaded": false,
});

export function subGalleryReducer(
  state = initialState,
  action: SubGalleryActions.SubGalleryActions | ImageActions.ImageActions
) {
  switch (action.type) {
    case SubGalleryActions.SUB_GALLERIES_LOADED:
      const subGalleries: SubGalleryStoreObj[] = action.payload.subGalleries.map(
        (sg: SubGalleryImportObj) => {
          return {
            ...sg,
            "images": sg.images.map((img: ImageStoreObj) => img._id),
          };
        }
      );

      return adapter.setAll(subGalleries, {
        ...state,
        "subGalleriesLoaded": true,
      });
    case SubGalleryActions.SUB_GALLERY_SELECTED:
      return {
        ...state,
        "selectedSubGalleryId": action.payload.selectedSubGalleryId,
      };
    case SubGalleryActions.SUB_GALLERIES_UPDATE_TO_STORE_REQUESTED:
      return adapter.updateMany(action.payload.subGalleries, state);
    case ImageActions.IMG_UPLOAD_COMPLETED:
      const subGalleryId: string = action.payload.imgData.gallery;
      const imgs: string[] = state.entities[subGalleryId].images.slice();
      imgs.push(action.payload.imgData._id);

      return adapter.updateOne(
        { "id": subGalleryId, "changes": { "images": imgs } },
        state
      );
    case ImageActions.IMG_DELETE_COMPLETED:
      const sgId: string = action.payload.subGalleryId;
      const imgId: string = action.payload.imgId;
      const filteredImgs: string[] = state.entities[sgId].images.filter(
        (img: string) => img !== imgId
      );

      return adapter.updateOne(
        { "id": sgId, "changes": { "images": filteredImgs } },
        state
      );
    case SubGalleryActions.SUB_GALLERY_CREATE_REQUESTED:
      return { ...state, "subGalleryCreated": false };
    case SubGalleryActions.SUB_GALLERY_CREATE_COMPLETED:
      return adapter.addOne(action.payload.subGallery, {
        ...state,
        "subGalleryCreated": true,
      });
    case SubGalleryActions.SUB_GALLERY_DELETE_COMPLETED:
      return adapter.removeOne(action.payload.subGalleryId, state);
    default:
      return state;
  }
}

export const getSelectedSubGalleryId = (state: State) =>
  state.selectedSubGalleryId;

export const getSubGalleryCreated = (state: State) => state.subGalleryCreated;

export const subGalleriesLoaded = (state: State) => state.subGalleriesLoaded;

export const { selectAll } = adapter.getSelectors();
