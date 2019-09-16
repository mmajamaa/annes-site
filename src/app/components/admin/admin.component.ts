import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms'
import { DomSanitizer } from '@angular/platform-browser';

import { AuthenticationService } from '../../services/authentication.service';
import { ImagesService } from '../../services/images.service';

import { Image } from '../../interfaces/image';


@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  username = '';
  file: File = null;
  imgUrl: any;
  public images: Image[];
  // todo: get values dynamically
  values = [
    {value: 'prints', name: 'Vedokset'},
    {value: 'paintings', name: 'Maalaukset'}
  ];

  constructor(private router: Router,
              private auth: AuthenticationService,
              private img: ImagesService,
              private domSanitizer: DomSanitizer) {
    this.auth.getUserName().subscribe(
      data => this.username = data.toString(),
      error => this.router.navigate(['/login'])
    )

    this.img.getImages().subscribe(res => {
      this.images = res;
    })
  }

  ngOnInit() {}

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

  onFileSelected(files) {
    this.file = files[0];

    var reader = new FileReader();
    reader.readAsDataURL(files[0]);
    reader.onload = (_event) => {
      this.imgUrl = reader.result;
    }
  }

  uploadFile(form: NgForm) {
    console.log(form.value.gallery)
    if (confirm('Haluatko varmasti ladata kuvan?') == false) {
      return;
    }
    const fd = new FormData();
    fd.append('image', this.file);
    fd.append('alt', form.value.alt);
    fd.append('gallery', form.value.gallery);
    this.img.uploadImage(fd).subscribe(
      (res:any) => {
        // add image to list
        let image: Image = {_id: res._id, url: res.url, alt: res.alt, so: res.so, gallery: res.gallery};
        this.images.push(image);
        // empty form
        form.reset();
        this.file = null;
        this.imgUrl = null;
      },
      error => {
        console.log(error)
      }
    );
  }

  deleteImage(id:String) {
    if (confirm('Haluatko varmasti poistaa kuvan?') == false) {
      return;
    }

    this.img.deleteImage(id).subscribe(
      res => {
        // delete image from list
        let img = this.images.find(i => i._id == id);
        const index: number = this.images.indexOf(img);
        if (index !== -1) {
          this.images.splice(index, 1);
        }
      },
      err => {
        console.log(err);
      }
    );
  }

  openImage(event) {
    // Get the modal
    var modal = document.getElementById("myModal");
    console.log(event.target.src)
    // Get the image and insert it inside the modal - use its "alt" text as a caption
    var img = document.getElementById("myImg");
    var modalImg = document.getElementById("img01");
    var captionText = document.getElementById("caption");
    console.log('jaa')
    modal.style.display = "block";
    (<HTMLImageElement>modalImg).src = event.target.src;
    captionText.innerHTML = event.target.alt;

    // Get the <span> element that closes the modal
    var span = document.getElementsByClassName("close")[0];

    // When the user clicks on <span> (x), close the modal
    span.onclick = function() {
      console.log('click!')
      modal.style.display = "none";
    }
  }
}
