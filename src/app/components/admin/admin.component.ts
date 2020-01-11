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
  selectedGallery: any = null;
  // todo: get values dynamically
  values = [
    {value: 'prints', name: 'Vedokset'},
    {value: 'paintings', name: 'Maalaukset'}
  ];

  public gallerys;

  constructor(private router: Router,
              private auth: AuthenticationService,
              private img: ImagesService,
              private domSanitizer: DomSanitizer) {
    this.auth.getAuthStatus().subscribe(
      data => {this.username = 'test'
              console.log('moi')},
      error => this.router.navigate(['/login'])
    )

    this.img.getGallerys().subscribe(res => {
      this.gallerys = res;
      this.selectedGallery = this.gallerys[0]._id;
      console.log(this.selectedGallery)
    })

    this.img.getImages().subscribe(res => {
      console.log(res)
      this.images = res.filter(i => i.gallery);
    });


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
    if (confirm('Haluatko varmasti ladata kuvan?') == false) {
      return;
    }
    const fd = new FormData();
    fd.append('image', this.file);
    fd.append('alt', form.value.alt);
    this.img.uploadImage(fd, form.value.gallery).subscribe(
      (res:any) => {
        // add image to list
        let image: Image = {Key: res.Key, _id: res._id, url: res.url, alt: res.alt, so: res.so, gallery: res.gallery};
        this.images.push(image);
        console.log(this.images)
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

  deleteImage(key:String) {
    if (confirm('Haluatko varmasti poistaa kuvan?') == false) {
      return;
    }

    this.img.deleteImage(key).subscribe(
      res => {
        // delete image from list
        let img = this.images.find(i => i.Key == key);
        const index: number = this.images.indexOf(img);
        if (index !== -1) {
          this.images.splice(index, 1);
        }
        console.log(res)
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
  }

  closeModal() {
    var modal = document.getElementById("myModal");
    modal.style.display = "none";
  }

  // todo: alot
  moveRow(direction, i) {
    if (i == 0 && direction == 1) {

    } else if (i == this.images.length - 1 && direction == -1) {

    } else if (direction == 1) {
      let a = this.images[i]
      this.images[i] = this.images[i-1];
      this.images[i-1] = a;
      //[this.images[i], this.images[i-1] = [this.images[i-1], this.images[i]]]
    } else if (direction == -1) {
      let a = this.images[i]
      this.images[i] = this.images[i+1];
      this.images[i+1] = a;
      //[this.images[i-1], this.images[i] = [this.images[i], this.images[i-1]]]
    }

    console.log(this.images)
  }

  gallerySelected(gallery) {
    //this.selectedGallery = this.gallerys.find(g => g._id == gallery);
    this.selectedGallery = gallery;
    console.log(gallery)
  }

  createGallery(form: NgForm) {
    if (confirm('Haluatko varmasti luoda alagallerian?') == false) {
      console.log(form.value.fi)
      console.log(form.value.en)
      return;
    }
    const fd = new FormData();
    fd.append('fi', form.value.fi);
    fd.append('en', form.value.en);

    this.img.createGallery(form.value.fi, form.value.en).subscribe(
      (res:any) => {
        this.gallerys.push(res);
        console.log(res);
      },
      err => {
        console.log(err);
      }
    );
  }

  deleteGallery(form: NgForm) {
    console.log(form.value)
    console.log(this.selectedGallery._id)
    if (confirm('Haluatko varmasti poistaa gallerian?') == false) {
      return;
    }
    this.img.deleteGallery(form.value.gallery).subscribe(
      res => {
        console.log(res);
        // delete gallery from list
        let gallery = this.gallerys.find(i => i._id == form.value.gallery);
        const index: number = this.gallerys.indexOf(gallery);
        if (index !== -1) {
          this.gallerys.splice(index, 1);
        }
      },
      err => {
        console.log(err);
      }
    )
  }
}
