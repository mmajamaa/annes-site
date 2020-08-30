import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from "@angular/router";
import { AuthenticationService } from "../authentication.service";
import { Injectable } from "@angular/core";

import { Subscription } from "rxjs";

import { FacadeService } from "../../shared/facade/facade.service";
import { AuthenticationResponseData } from "./authentication-response-data";

@Injectable({
  "providedIn": "root",
})
export class LoginResolver implements Resolve<void | Subscription> {
  public constructor(
    private authenticationService: AuthenticationService,
    private router: Router,
    private facade: FacadeService
  ) {}

  public resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): void | Subscription {
    if (route.queryParams.resolve === "false") {
      return;
    }

    return this.authenticationService.authStatus().subscribe(
      (data: AuthenticationResponseData) => {
        this.router.navigate(["/auth/admin"]);
        return data;
      },
      (error: Error) => {
        this.facade.logoutRequested();
        this.router.navigate(["/auth/login"]);
      }
    );
  }
}
