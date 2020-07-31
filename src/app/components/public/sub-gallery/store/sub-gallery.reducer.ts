import * as SubGalleryActions from "./sub-gallery.actions";
import { SubGallery } from "src/app/components/shared/sub-gallery";
import { EntityState, EntityAdapter, createEntityAdapter } from "@ngrx/entity";

export interface State extends EntityState<SubGallery> {
  selectedSubGalleryId: string | null;
  subGalleries: SubGallery[];
  uploadingImgStatus: string;
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
  uploadingImgStatus: null,
  subGalleryCreated: null,
});

export function subGalleryReducer(
  state = initialState,
  action: SubGalleryActions.SubGalleryActions
) {
  switch (action.type) {
    case SubGalleryActions.SUB_GALLERIES_LOADED:
      return adapter.addAll(action.payload.subGalleries, {
        ...state,
      });
    case SubGalleryActions.SUB_GALLERY_SELECTED:
      return {
        ...state,
        selectedSubGalleryId: action.payload.selectedSubGalleryId,
      };
    case SubGalleryActions.SUB_GALLERIES_UPDATE_TO_STORE_REQUESTED:
      return adapter.updateMany(action.payload.subGalleries, state);
    case SubGalleryActions.IMG_UPLOAD_COMPLETED:
      const subGalleryId = action.payload.imgData.gallery;
      const imgs = state.entities[subGalleryId].images.slice();
      imgs.push(action.payload.imgData);
      return adapter.updateOne(
        { id: subGalleryId, changes: { images: imgs } },
        { ...state, uploadingImgStatus: "completed" }
      );
    case SubGalleryActions.IMG_UPLOAD_CANCELLED:
      return { ...state, uploadingImgStatus: "cancelled" };
    case SubGalleryActions.RESET_UPLOADING_IMG:
      return { ...state, uploadingImgStatus: null };
    case SubGalleryActions.IMG_DELETE_COMPLETED:
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

export const getUploadingImgStatus = (state: State) => state.uploadingImgStatus;

export const getSubGalleryCreated = (state: State) => state.subGalleryCreated;

//export const { selectAll } = adapter.getSelectors();

export const selectAll = (state: State) => {
  const subGalleries = [];

  for (let sg in state.entities) {
    let imgsSorted = state.entities[sg].images
      .slice()
      .sort((a, b) => a.so - b.so);
    let subGallery = { ...state.entities[sg], images: imgsSorted };
    subGalleries.push(subGallery);
  }
  const subGalleriesSorted = subGalleries.sort((a, b) => a.so - b.so);
  return subGalleriesSorted;
};

export const selectAllSubGalleries = selectAll;
