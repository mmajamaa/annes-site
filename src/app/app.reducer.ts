import { ActionReducerMap } from "@ngrx/store";

import * as fromAuth from "./annes-site/auth/store/auth.reducer";
import * as fromSubGalleries from "./annes-site/shared/sub-gallery/sub-gallery.reducer";
import * as fromImages from "./annes-site/shared/image/image.reducer";

export interface AppState {
  auth: fromAuth.State;
  subGalleries: fromSubGalleries.State;
  images: fromImages.State;
}

export const appReducer: ActionReducerMap<AppState> = {
  auth: fromAuth.authReducer,
  subGalleries: fromSubGalleries.subGalleryReducer,
  images: fromImages.imageReducer,
};
