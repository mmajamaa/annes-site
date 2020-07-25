import * as SubGalleryActions from './sub-gallery.actions';
import { SubGallery } from 'src/app/components/shared/sub-gallery';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity'

export interface State extends EntityState<SubGallery> {
    selectedSubGalleryId: string | null,
    subGalleries: SubGallery[];
}

const adapter: EntityAdapter<SubGallery> = createEntityAdapter<SubGallery>({ selectId: subGallery => subGallery._id });

export const initialState: State = adapter.getInitialState({
    selectedSubGalleryId: null,
    subGalleries: []
})

export function subGalleryReducer(
    state = initialState,
    action: SubGalleryActions.SubGalleryActions
) {
    switch (action.type) {
        case SubGalleryActions.SUB_GALLERIES_LOADED:
            return adapter.addAll(action.payload.subGalleries, { ...state, selectedSubGalleryId: action.payload.subGalleries[0]._id })
        case SubGalleryActions.SUB_GALLERY_SELECTED:
            return { ...state, selectedSubGalleryId: action.payload.selectedSubGalleryId }
        default:
            return state;
    }

}

export const getSelectedSubGalleryId = (state: State) => state.selectedSubGalleryId;

export const { selectAll } = adapter.getSelectors();

export const selectAllSubGalleries = selectAll;