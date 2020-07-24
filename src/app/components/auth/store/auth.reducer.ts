import * as AuthActions from './auth.actions';
import { User } from '../user';
import { isLoggedIn } from './auth.selectors';

export interface State {
    user: User,
    authError: string,
    loading: boolean,
    isLoggedIn: boolean
}

export const initialState: State = {
    user: null,
    authError: null,
    loading: false,
    isLoggedIn: true
}

export function authReducer(
    state = initialState,
    action: AuthActions.AuthActions
) {
    switch (action.type) {
        // login
        case AuthActions.LOGIN_START:
            return {
                ...state,
                authError: null,
                loading: true,
            }
        case AuthActions.LOGIN_SUCCESFUL:
            const user = new User(
                action.payload.username,
                action.payload.token
            )
            return {
                ...state,
                authError: null,
                user: user,
                loading: false,
                isLoggedIn: true
            }
        case AuthActions.LOGIN_FAILED:
            return {
                ...state,
                authError: action.payload,
                loading: false,
            }
        // logout    
        case AuthActions.LOGOUT_REQUESTED:
            return {
                ...state,
                user: null,
                authError: null,
                loading: false, // TODO: change this when logout confirmed on back-end
                isLoggedIn: false // this too
            }
        default:
            return state;
    }
}