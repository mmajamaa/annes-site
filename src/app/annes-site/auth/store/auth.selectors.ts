import { createFeatureSelector, createSelector } from "@ngrx/store";

import * as fromAuth from "./auth.reducer";

export const selectAuthState = createFeatureSelector<fromAuth.State>("auth");

export const isLoggedIn = createSelector(
  selectAuthState,
  (state: fromAuth.State) => state.isLoggedIn
);

export const isQuickSave = createSelector(
  selectAuthState,
  (state: fromAuth.State) => state.quickSave
);

// TODO: finish typing
