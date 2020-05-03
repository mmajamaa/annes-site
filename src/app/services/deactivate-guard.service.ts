import { CanDeactivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { AuthenticationService } from './authentication.service';
import { map, take } from 'rxjs/operators';

import { FacadeService } from '../store/facade.service';

export interface CanComponentDeactivate {
  canDeactivate: () => Observable<boolean> | Promise<boolean> | boolean;
}

@Injectable({ providedIn: 'root' })
export class DeactivateGuardService implements CanDeactivate<CanComponentDeactivate> {
  constructor(private authenticationService: AuthenticationService, private facade: FacadeService) { }

  canDeactivate(component: CanComponentDeactivate, route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.facade.isLoggedIn().pipe(
      map((isLoggedIn: boolean) => {
        return !isLoggedIn
      })
    )
  }
}