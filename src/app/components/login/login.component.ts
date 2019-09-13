import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthenticationService } from '../../services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private authenticationService: AuthenticationService, private router: Router) { }

  ngOnInit() {
  }

  loginUser(form: NgForm) {
    const username = form.value.username;
    const password = form.value.password;

    this.authenticationService.getUserDetails(username, password).subscribe((data: any) => {
      if (data.success) {
        console.log(data)
        this.router.navigate(['admin']);
        this.authenticationService.setLoggedIn(true);
      } else {
        window.alert('bad credentials, ' + data.message);
      }
    });
  }

}
