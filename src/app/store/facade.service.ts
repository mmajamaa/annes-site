import { Injectable } from '@angular/core';

import { Store } from '@ngrx/store';

import * as AuthActions from './auth.actions';


@Injectable({ providedIn: 'root' })
export class FacadeService {
    constructor(private store: Store) { }

    loginStart(username: string, password: string) {
        this.store.dispatch(
            new AuthActions.LoginStart({ username: username, password: password })
        )
    }
}