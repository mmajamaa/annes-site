import * as SubGalleryActions from "./sub-gallery.actions";
import * as ImageActions from "../../../shared/images/images.actions";
import { SubGallery } from "src/app/components/shared/sub-gallery";
import { EntityState, EntityAdapter, createEntityAdapter } from "@ngrx/entity";

export interface State extends EntityState<SubGallery> {
  selectedSubGalleryId: string | null;
  subGalleries: SubGallery[];
  subGalleryCreated: boolean;
}

export function compareBySo(a, b) {
  return a.so - b.so;
}

const adapter: EntityAdapter<SubGallery> = createEntityAdapter<SubGallery>({
  selectId: (subGallery) => subGallery._id,
  sortComparer: compareBySo,
});

export const initialState: State = adapter.getInitialState({
  selectedSubGalleryId: null,
  subGalleries: [],
  subGalleryCreated: null,
});

export function subGalleryReducer(
  state = initialState,
  action: SubGalleryActions.SubGalleryActions | ImageActions.ImageActions
) {
  switch (action.type) {
    case SubGalleryActions.SUB_GALLERIES_LOADED:
      let subGalleries = action.payload.subGalleries.map((sg) => {
        return { ...sg, images: sg.images.map((img) => img._id) };
      });
      return adapter.addAll(subGalleries, {
        ...state,
      });
    case SubGalleryActions.SUB_GALLERY_SELECTED:
      return {
        ...state,
        selectedSubGalleryId: action.payload.selectedSubGalleryId,
      };
    case SubGalleryActions.SUB_GALLERIES_UPDATE_TO_STORE_REQUESTED:
      return adapter.updateMany(action.payload.subGalleries, state);
    case ImageActions.IMG_UPLOAD_COMPLETED:
      const subGalleryId = action.payload.imgData.gallery;
      const imgs = state.entities[subGalleryId].images.slice();
      imgs.push(action.payload.imgData._id);
      return adapter.updateOne(
        { id: subGalleryId, changes: { images: imgs } },
        state
      );
    case ImageActions.IMG_DELETE_COMPLETED:
      const sgId = action.payload.subGalleryId;
      const imgId = action.payload.imgId;
      const filteredImgs = state.entities[sgId].images.filter(
        (img) => img._id !== imgId
      );
      return adapter.updateOne(
        { id: sgId, changes: { images: filteredImgs } },
        state
      );
    case SubGalleryActions.SUB_GALLERY_CREATE_REQUESTED:
      return { ...state, subGalleryCreated: false };
    case SubGalleryActions.SUB_GALLERY_CREATE_COMPLETED:
      return adapter.addOne(action.payload.subGallery, {
        ...state,
        subGalleryCreated: true,
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

export const { selectAll } = adapter.getSelectors();
