import { Action } from '@ngrx/store';

export const LOGIN_START = '[] Login Start';
export const LOGIN_SUCCESFUL = '[] Login Succesful';
export const LOGIN_FAILED = '[] Login Failed';

export class LoginSuccesful implements Action {
    public readonly type = LOGIN_SUCCESFUL;
    constructor(public payload: { username: string; token: string; }) { }
}

export class LoginStart implements Action {
    public readonly type = LOGIN_START;
    constructor(public payload: { username: string; password: string }) { }
}

export class LoginFailed implements Action {
    public readonly type = LOGIN_FAILED;
    constructor(public payload: string) { }
}

export type AuthActions = | LoginStart | LoginSuccesful | LoginFailed 