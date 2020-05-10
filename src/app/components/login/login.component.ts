import { Component, OnInit } from "@angular/core";
import { Observable } from 'rxjs';
import { AuthenticationService } from "../../services/authentication.service";
import { AuthenticationResponseData } from '../../interfaces/authentication-response-data';
import { Router } from "@angular/router";
import { SnackBarService } from 'src/app/services/snack-bar.service';

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {
  private authObs: Observable<AuthenticationResponseData>;

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router,
    private snackBarService: SnackBarService
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
        this.snackBarService.openSnackBar('Error logging in.', 'warn-snackbar');
      }
    );
  }
}
