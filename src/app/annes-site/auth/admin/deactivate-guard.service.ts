import { Injectable } from "@angular/core";
import {
  CanDeactivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from "@angular/router";

import { Observable } from "rxjs";
import { map, takeUntil } from "rxjs/operators";

import { FacadeService } from "../../shared/facade/facade.service";
import { BaseComponent } from "../../core/base/base.component";

export interface CanComponentDeactivate {
  canDeactivate: () => Observable<boolean> | Promise<boolean> | boolean;
}

@Injectable({ "providedIn": "root" })
export class DeactivateGuardService
  extends BaseComponent
  implements CanDeactivate<CanComponentDeactivate> {
  public constructor(private facade: FacadeService) {
    super();
  }

  public canDeactivate(
    component: CanComponentDeactivate,
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    return this.facade.isLoggedIn().pipe(
      takeUntil(this.ngUnsubscribe),
      map((loggedIn: boolean) => {
        return !loggedIn;
      })
    );
  }
}
