import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";

import { Observable } from 'rxjs';

import { FacadeService } from '../../store/facade.service';
import { AuthenticationResponseData } from '../../interfaces/authentication-response-data';

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {
  private authObs: Observable<AuthenticationResponseData>;

  constructor(
    private facade: FacadeService
  ) {
    this.facade.autoLogin();
  }

  ngOnInit() { }

  loginUser(form) {
    const username = form.value.username;
    const password = form.value.password;

    this.facade.loginStart(username, password);
  }
}
