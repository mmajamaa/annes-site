import { Component } from "@angular/core";
import { NgForm } from "@angular/forms";

import { FacadeService } from "../../shared/facade/facade.service";

@Component({
  "selector": "app-login",
  "templateUrl": "./login.component.html",
  "styleUrls": ["./login.component.css"],
})
export class LoginComponent {
  public constructor(private facade: FacadeService) {
    this.facade.autoLogin();
  }

  public loginUser(form): void {
    const username: string = form.value.username;
    const password: string = form.value.password;

    this.facade.loginStart(username, password);
  }
}
