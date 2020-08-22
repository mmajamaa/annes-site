import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from "@angular/router";
import { AuthenticationService } from "../authentication.service";
import { Injectable } from "@angular/core";

import { FacadeService } from "../../shared/facade.service";

@Injectable({
  providedIn: "root",
})
export class LoginResolver implements Resolve<any> {
  constructor(
    private authenticationService: AuthenticationService,
    private router: Router,
    private facade: FacadeService
  ) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (route.queryParams.resolve === "false") {
      return;
    }

    return this.authenticationService.authStatus().subscribe(
      (data) => {
        this.router.navigate(["/auth/admin"]);
        return data;
      },
      (error) => {
        this.facade.logoutRequested();
        this.router.navigate(["/auth/login"]);
      }
    );
  }
}
