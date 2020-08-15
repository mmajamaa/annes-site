import { createFeatureSelector, createSelector } from "@ngrx/store";

import * as fromImages from "./images.reducer";

export const selectImageState = createFeatureSelector<fromImages.State>(
  "images"
);

export const selectAll = createSelector(
  selectImageState,
  (imgs) => imgs.entities
);

export const isUploadingImg = createSelector(
  selectImageState,
  fromImages.getUploadingImgStatus
);
