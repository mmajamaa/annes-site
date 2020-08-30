import { Injectable } from "@angular/core";
import { Router } from "@angular/router";

import { of, Observable } from "rxjs";
import { Actions, ofType, Effect } from "@ngrx/effects";
import { switchMap, tap, map, catchError } from "rxjs/operators";

import { AuthenticationService } from "../authentication.service";
import * as AuthActions from "./auth.actions";
import { User } from "../user";
import { AuthenticationResponseData } from "../login/authentication-response-data";
import { SnackBarService } from "../../shared/snack-bar/snack-bar.service";

@Injectable({ "providedIn": "root" })
export class AuthEffects {
  @Effect()
  public authLogin: Observable<
    AuthActions.LoginSuccesful | AuthActions.LoginFailed
  > = this.actions$.pipe(
    ofType(AuthActions.LOGIN_START),
    switchMap((authData: AuthActions.LoginStart) => {
      return this.authenticationService
        .login(authData.payload.username, authData.payload.password)
        .pipe(
          map((resData: AuthenticationResponseData) => {
            const user: User = new User(resData.username, resData.token);
            localStorage.setItem("user", JSON.stringify(user));

            this.snackBar.openSnackBar(
              "Sisäänkirjautuminen onnistui.",
              "ok-snackbar"
            );

            return new AuthActions.LoginSuccesful({
              "username": resData.username,
              "token": resData.token,
            });
          }),
          catchError((errorRes: Error) => {
            this.snackBar.openSnackBar(
              "Virhe sisäänkirjautumisessa.",
              "warn-snackbar"
            );

            return of(new AuthActions.LoginFailed("error logging in"));
          })
        );
    })
  );

  @Effect({ "dispatch": false })
  public authRedirect: Observable<
    AuthActions.LoginSuccesful
  > = this.actions$.pipe(
    ofType(AuthActions.LOGIN_SUCCESFUL),
    tap((loginSuccesfulAction: AuthActions.LoginSuccesful) => {
      this.router.navigate(["/auth/admin"]);
    })
  );

  @Effect({ "dispatch": false })
  public authLogout: Observable<
    AuthActions.LogoutRequested
  > = this.actions$.pipe(
    ofType(AuthActions.LOGOUT_REQUESTED),
    tap((logoutRequested: AuthActions.LogoutRequested) => {
      localStorage.removeItem("user");
      this.router.navigate(["/auth/login"]);
    })
  );

  @Effect()
  public autoLogin: Observable<
    { "type": string } | AuthActions.LoginSuccesful
  > = this.actions$.pipe(
    ofType(AuthActions.AUTO_LOGIN),
    map((autoLogin: AuthActions.AutoLogin) => {
      const userData: { username: string; token: string } = JSON.parse(
        localStorage.getItem("user")
      );
      if (!userData) {
        return { "type": "DUMMY" };
      }

      const loadedUser: User = new User(userData.username, userData.token);

      return new AuthActions.LoginSuccesful({
        "username": loadedUser.username,
        "token": loadedUser.token,
      });
    })
  );

  public constructor(
    private readonly authenticationService: AuthenticationService,
    private readonly router: Router,
    private readonly actions$: Actions,
    private readonly snackBar: SnackBarService
  ) {}
}
