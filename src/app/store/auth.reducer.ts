import * as AuthActions from './auth.actions';
import { User } from '../models/user';

export interface State {
    user: User,
    authError: string,
    loading: boolean
}

export const initialState: State = {
    user: null,
    authError: null,
    loading: false
}

export function authReducer(
    state = initialState,
    action: AuthActions.AuthActions
) {
    switch (action.type) {
        case AuthActions.LOGIN_SUCCESFUL:
            const user = new User(
                action.payload.username,
                action.payload.token
            )
            return {
                ...state,
                authError: null,
                user: user,
                loading: false
            }
        case AuthActions.LOGIN_FAILED:
            return {
                ...state,
                authError: action.payload,
                loading: false
            }
        case AuthActions.LOGIN_START:
            return {
                ...state,
                authError: null,
                loading: true
            }
        default:
            return state;
    }
}