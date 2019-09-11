import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from './services/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationGuard implements CanActivate {

  constructor(private auth: AuthenticationService) {}

  setLoggedIn(value: boolean) {
    this.loggedInStatus = true;
  }
  canActivate(): boolean {
    return this.auth.isLoggedIn;
  }

}
