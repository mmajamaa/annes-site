import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Observable } from 'rxjs';
import { AuthenticationService } from "../authentication.service";
import { AuthenticationResponseData } from './authentication-response-data';
import { Router } from "@angular/router";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {
  private authObs: Observable<AuthenticationResponseData>;

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router
  ) { }

  ngOnInit() { }

  loginUser(form) {
    const username = form.value.username;
    const password = form.value.password;

    this.authObs = this.authenticationService.login(username, password)

    this.authObs.subscribe(
      data => {
        this.router.navigate(["/auth/admin"]);
      },
      error => {
        window.alert(error);
      }
    );
  }
}