import { ActionReducerMap } from '@ngrx/store';

import * as fromAuth from './components/auth/store/auth.reducer';
import * as fromSubGalleries from './components/public/sub-gallery/store/sub-gallery.reducer';

export interface AppState {
    auth: fromAuth.State
    subGalleries: fromSubGalleries.State
}

export const appReducer: ActionReducerMap<AppState> = {
    auth: fromAuth.authReducer,
    subGalleries: fromSubGalleries.subGalleryReducer
}