import { Injectable } from "@angular/core";
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
  ActivatedRoute,
} from "@angular/router";

import { Observable, of } from "rxjs";
import { map, catchError } from "rxjs/operators";

import { AuthenticationService } from "./authentication.service";
import { AuthenticationResponseData } from "./login/authentication-response-data";

@Injectable({ "providedIn": "root" })
export class AuthGuard implements CanActivate {
  public constructor(
    private authenticationService: AuthenticationService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  public canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    return this.authenticationService.authStatus().pipe(
      map((data: AuthenticationResponseData) => {
        return true;
      }),
      catchError(() => {
        this.router.navigate(["/auth/login"]);
        return of(false);
      })
    );
  }
}
