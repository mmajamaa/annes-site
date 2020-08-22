import { Injectable } from "@angular/core";
import {
  CanDeactivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from "@angular/router";

import { Observable } from "rxjs";
import { map, take } from "rxjs/operators";

import { AuthenticationService } from "../authentication.service";
import { FacadeService } from "../../shared/facade.service";

export interface CanComponentDeactivate {
  canDeactivate: () => Observable<boolean> | Promise<boolean> | boolean;
}

@Injectable({ providedIn: "root" })
export class DeactivateGuardService
  implements CanDeactivate<CanComponentDeactivate> {
  constructor(
    private authenticationService: AuthenticationService,
    private facade: FacadeService
  ) {}

  canDeactivate(
    component: CanComponentDeactivate,
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ) {
    return this.facade.isLoggedIn().pipe(
      take(1),
      map((loggedIn) => {
        return !loggedIn;
      })
    );
  }
}
