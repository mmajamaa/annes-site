import { Injectable } from "@angular/core";
import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from "@angular/router";

import { Subscription } from "rxjs";

import { AuthenticationService } from "./authentication.service";
import { AuthenticationResponseData } from "./login/authentication-response-data";

@Injectable({
  "providedIn": "root",
})
export class AuthResolver implements Resolve<Subscription> {
  public constructor(
    private authenticationService: AuthenticationService,
    private router: Router
  ) {}

  public resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Subscription {
    return this.authenticationService.authStatus().subscribe(
      (data: AuthenticationResponseData) => {
        return data;
      },
      () => {
        this.router.navigate(["/auth/login"]);
      }
    );
  }
}
