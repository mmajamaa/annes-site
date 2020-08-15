import { createFeatureSelector, createSelector } from "@ngrx/store";

import * as fromSubGallery from "./sub-gallery.reducer";
import * as imageSelectors from "../../../shared/images/images.selectors";

export const selectSubGalleryState = createFeatureSelector<
  fromSubGallery.State
>("subGalleries");

export const selectAll = createSelector(
  selectSubGalleryState,
  fromSubGallery.selectAll
);

export const selectAllSubGalleries = createSelector(
  selectAll,
  imageSelectors.selectAll,
  (subGalleries, imgEntities) => {
    let sgs = [];
    for (let sgId in subGalleries) {
      let sgsImgs = [];
      for (let imgId in imgEntities) {
        if (subGalleries[sgId].images.indexOf(imgId) > -1) {
          sgsImgs.push(imgEntities[imgId]);
        }
      }
      let subGalleryObj = {
        ...subGalleries[sgId],
        images: sgsImgs.sort((a, b) => a.so - b.so),
      };

      sgs.push(subGalleryObj);
    }

    sgs.sort((a, b) => a.so - b.so);

    return sgs;
  }
);

export const selectCurrentSubGalleryId = createSelector(
  selectSubGalleryState,
  fromSubGallery.getSelectedSubGalleryId
);

export const selectCurrentSubGallery = createSelector(
  selectSubGalleryState,
  selectCurrentSubGalleryId,
  imageSelectors.selectAll,
  (subGalleryEntities, subGalleryId, imgEntities) => {
    if (!subGalleryId) {
      return;
    }
    let sgsImgs = [];
    for (let imgId in imgEntities) {
      if (
        subGalleryEntities.entities[subGalleryId].images.indexOf(imgId) > -1
      ) {
        sgsImgs.push(imgEntities[imgId]);
      }
    }
    let subGalleryObj = {
      ...subGalleryEntities.entities[subGalleryId],
      images: sgsImgs.sort((a, b) => a.so - b.so),
    };

    return subGalleryObj;
  }
);

export const isSubGalleryCreated = createSelector(
  selectSubGalleryState,
  fromSubGallery.getSubGalleryCreated
);
