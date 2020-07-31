import { Injectable } from "@angular/core";
import { Router } from "@angular/router";

import { of } from "rxjs";
import { Actions, ofType, Effect } from "@ngrx/effects";
import { switchMap, tap, map, catchError } from "rxjs/operators";

import { AuthenticationService } from "../authentication.service";
import * as AuthActions from "./auth.actions";
import { User } from "../user";
import { AuthenticationResponseData } from "../login/authentication-response-data";

@Injectable({ providedIn: "root" })
export class AuthEffects {
  @Effect()
  authLogin = this.actions$.pipe(
    ofType(AuthActions.LOGIN_START),
    switchMap((authData: AuthActions.LoginStart) => {
      return this.authenticationService
        .login(authData.payload.username, authData.payload.password)
        .pipe(
          map(
            (resData: AuthenticationResponseData) => {
              const user = new User(resData.username, resData.token);
              localStorage.setItem("user", JSON.stringify(user));

              return new AuthActions.LoginSuccesful({
                username: resData.username,
                token: resData.token,
              });
            },
            catchError((errorRes) => {
              return of(new AuthActions.LoginFailed(errorRes));
            })
          )
        );
    })
  );

  @Effect({ dispatch: false })
  authRedirect = this.actions$.pipe(
    ofType(AuthActions.LOGIN_SUCCESFUL),
    tap((loginSuccesfulAction: AuthActions.LoginSuccesful) => {
      this.router.navigate(["/auth/admin"]);
    })
  );

  @Effect({ dispatch: false })
  authLogout = this.actions$.pipe(
    ofType(AuthActions.LOGOUT_REQUESTED),
    tap((logoutRequested: AuthActions.LogoutRequested) => {
      localStorage.removeItem("user");
      console.log("jaajaa");
      this.router.navigate(["/auth/login"]);
    })
  );

  @Effect()
  autoLogin = this.actions$.pipe(
    ofType(AuthActions.AUTO_LOGIN),
    map((autoLogin: AuthActions.AutoLogin) => {
      const userData: { username: string; token: string } = JSON.parse(
        localStorage.getItem("user")
      );
      if (!userData) {
        return { type: "DUMMY" };
      }

      const loadedUser = new User(userData.username, userData.token);

      return new AuthActions.LoginSuccesful({
        username: loadedUser.username,
        token: loadedUser.token,
      });
    })
  );

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router,
    private actions$: Actions
  ) {}
}
