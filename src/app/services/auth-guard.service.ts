import { Injectable } from '@angular/core'
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, UrlTree, ActivatedRoute } from '@angular/router';
import { Observable, throwError, of } from 'rxjs';
import { AuthenticationService } from './authentication.service';
import { map, take, catchError } from 'rxjs/operators';

@Injectable({providedIn: 'root'})
export class AuthGuard implements CanActivate {
    constructor(private authenticationService: AuthenticationService, private router: Router, private route: ActivatedRoute) {
        console.log(this.route.snapshot.queryParams['testi'])
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
        console.log(this.route.snapshot.queryParams['testi'])

        return this.authenticationService.authStatus().pipe(map(
            data => {
                return true;
            }
        ), catchError(error => {
            this.router.navigate(['login']);
            return of(error)
            })
        );
    }
} 