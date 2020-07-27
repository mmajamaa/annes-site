import { createFeatureSelector, createSelector } from "@ngrx/store";

import * as fromAuth from "./auth.reducer";

export const selectAuthState = createFeatureSelector<fromAuth.State>("auth");

export const isLoggedIn = createSelector(
  selectAuthState,
  (state) => state.isLoggedIn
);

export const isQuickSave = createSelector(
  selectAuthState,
  (state) => state.quickSave
);
