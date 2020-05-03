import { Injectable } from '@angular/core';

import { Store } from '@ngrx/store';

import * as AuthActions from './auth.actions';
import * as AuthSelectors from './auth.selectors';
import { Observable } from 'rxjs';


@Injectable({ providedIn: 'root' })
export class FacadeService {
    constructor(private store: Store) { }

    autoLogin() {
        this.store.dispatch(new AuthActions.AutoLogin());
    }

    loginStart(username: string, password: string) {
        this.store.dispatch(
            new AuthActions.LoginStart({ username: username, password: password })
        )
    }

    logoutRequested() {
        this.store.dispatch(new AuthActions.LogoutRequested());
    }

    isLoggedIn(): Observable<boolean> {
        return this.store.select(AuthSelectors.isLoggedIn);
    }
}