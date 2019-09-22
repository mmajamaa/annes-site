import { Component, OnInit, HostListener } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Image } from '../../interfaces/image';

// services
import { ImagesService } from '../../services/images.service';

@Component({
  selector: 'app-sub-gallery',
  templateUrl: './sub-gallery.component.html',
  styleUrls: ['./sub-gallery.component.css']
})
export class SubGalleryComponent implements OnInit {
  public images: Image[];
  public gallery: any;
  public slideIndex;

  constructor(private activatedRoute: ActivatedRoute,
              private imagesService: ImagesService) { }

  ngOnInit() {
    this.slideIndex = 1;
    // filter images based on gallery's name
    this.gallery = this.activatedRoute.params.subscribe(params => {
      this.imagesService.getImages().subscribe(res => {
        this.images = res.filter(e => e.gallery == params['galleryName']);
      })
    })
  }

  closeImg(e) {
    e.style.display = "none";
  }

  openModal() {
    document.getElementById("myModal").style.display = "block";
  }

  closeModal() {
    document.getElementById("myModal").style.display = "none";
  }

  plusSlides(n) {
    this.showSlides(this.slideIndex += n);
  }

  currentSlide(n) {
    this.showSlides(this.slideIndex = n);
  }

  showSlides(n) {
    var i;
    var slides = document.getElementsByClassName("mySlides");
    var dots = document.getElementsByClassName("demo");
    var captionText = document.getElementById("caption");
    if (n > slides.length) {this.slideIndex = 1}
    if (n < 1) {this.slideIndex = slides.length}
    for (i = 0; i < slides.length; i++) {
      (<HTMLElement>slides[i]).style.display = "none";
    }
    for (i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace(" active", "");
    }
    (<HTMLElement>slides[this.slideIndex-1]).style.display = "block";
    dots[this.slideIndex-1].className += " active";
    captionText.innerHTML = (<HTMLImageElement>dots[this.slideIndex-1]).alt;
  }

  @HostListener('click', ['$event.target']) clickInside(e) {
    if (e.id == "expanded-img" || e.className != "gallery-img") return

    let expandImg = <HTMLElement>document.getElementById("expanded-img");
    // get the image text
    var imgText = <HTMLElement>document.getElementById("img-text");
    // use the same src in the expanded image as the image being clicked on from the grid
    (<HTMLImageElement>expandImg).src = e.src;
    // use the value of the alt attribute of the clickable image as text inside the expanded image
    imgText.innerHTML = e.alt;
    // show the container element (hidden with CSS)
    expandImg.parentElement.style.display = "block";
  }
}
