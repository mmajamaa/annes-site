import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthenticationService } from './authentication.service';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: "root"
})
export class LoginResolver implements Resolve<any> {
    constructor(private authenticationService: AuthenticationService, private router: Router) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        return this.authenticationService.authStatus().subscribe(data => {
            this.router.navigate(['admin'])
            return data
        }, error => {
            this.router.navigate(['login'])
        });
    }

}