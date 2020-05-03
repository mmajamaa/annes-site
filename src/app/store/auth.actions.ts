import { Action } from '@ngrx/store';

// login
export const LOGIN_START = '[] Login Start';
export const LOGIN_SUCCESFUL = '[] Login Succesful';
export const LOGIN_FAILED = '[] Login Failed';
export const AUTO_LOGIN = '[] Auto Login'

// logout
export const LOGOUT_REQUESTED = '[] Logout Requested';
// failed

// get auth status
export const GET_AUTH_STATUS_REQUESTED = '[] Get Auth Status Requested';
export const GET_AUTH_STATUS_SUCCESFUL = '[] Get Auth Status Succesful';
export const GET_AUTH_STATUS_FAILED = '[] Get Auth Status Failed';


// login
export class LoginStart implements Action {
    public readonly type = LOGIN_START;
    constructor(public payload: { username: string; password: string }) { }
}

export class LoginSuccesful implements Action {
    public readonly type = LOGIN_SUCCESFUL;
    constructor(public payload: { username: string; token: string; }) { }
}

export class LoginFailed implements Action {
    public readonly type = LOGIN_FAILED;
    constructor(public payload: string) { }
}

export class AutoLogin implements Action {
    public readonly type = AUTO_LOGIN;
}

// logout
export class LogoutRequested implements Action {
    public readonly type = LOGOUT_REQUESTED;
}

export type AuthActions = | LoginStart | LoginSuccesful | LoginFailed | LogoutRequested | AutoLogin