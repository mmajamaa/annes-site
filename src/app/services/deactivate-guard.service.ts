import { CanDeactivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { AuthenticationService } from './authentication.service';
import { map, take } from 'rxjs/operators';

export interface CanComponentDeactivate {
    canDeactivate: () => Observable<boolean> | Promise <boolean> | boolean;
}

@Injectable({providedIn: 'root'})
export class DeactivateGuardService implements CanDeactivate<CanComponentDeactivate> {
    constructor(private authenticationService: AuthenticationService) {}

    canDeactivate(component: CanComponentDeactivate, route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        return this.authenticationService.loggedIn.pipe(
            take(1),
            map(loggedIn => {
              return !loggedIn;
            })
          );
    }
}