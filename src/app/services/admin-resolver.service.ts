import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthenticationService } from './authentication.service';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: "root"
})
export class AdminResolver implements Resolve<any> {
    constructor(private authenticationService: AuthenticationService, private router: Router) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        return this.authenticationService.authStatus().subscribe(data => {
            return data
        }, error => {
            this.router.navigate(['login'])
        });
    }

}