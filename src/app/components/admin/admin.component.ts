import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms'

import { AuthenticationService } from '../../services/authentication.service';
import { ImagesService } from '../../services/images.service';


@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  username = '';
  file: File = null;

  constructor(private router: Router,
              private auth: AuthenticationService,
              private img: ImagesService) {
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

  onFileSelected(event) {
    this.file = <File>event.target.files[0];
  }

  uploadFile(form: NgForm) {
    const fd = new FormData();
    fd.append('image', this.file);
    fd.append('alt', form.value.alt);
    this.img.uploadImage(fd).subscribe(
      res => {
        console.log('file uploaded');
        console.log(res)
      },
      error => {
        console.log('error res')
        console.log(error)
      }
    );
  }


}
