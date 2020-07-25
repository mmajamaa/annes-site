import { createFeatureSelector, createSelector } from '@ngrx/store';

import * as fromSubGallery from './sub-gallery.reducer';

export const selectSubGalleryState = createFeatureSelector<fromSubGallery.State>('subGalleries');

export const selectAllSubGalleries = createSelector(selectSubGalleryState, fromSubGallery.selectAllSubGalleries);

export const selectCurrentSubGalleryId = createSelector(selectSubGalleryState, fromSubGallery.getSelectedSubGalleryId);

export const selectCurrentSubGallery = createSelector(selectSubGalleryState, selectCurrentSubGalleryId, (subGalleryEntities, subGalleryId) => subGalleryEntities.entities[subGalleryId])