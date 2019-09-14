import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  username = '';

  constructor(private router: Router, private auth: AuthenticationService) {
    this.auth.getUserName().subscribe(
      data => {this.username = data.toString(), console.log(data.toString())},
      error => this.router.navigate(['/login'])
    )
  }

  ngOnInit() {}

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }
}
