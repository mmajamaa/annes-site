import { Component, OnInit, HostListener } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

// services
import { ImagesService } from '../../services/images.service';

@Component({
  selector: 'app-sub-gallery',
  templateUrl: './sub-gallery.component.html',
  styleUrls: ['./sub-gallery.component.css']
})
export class SubGalleryComponent implements OnInit {
  public images: Image[];

  constructor(private activatedRoute: ActivatedRoute,
              private imagesService: ImagesService) { }

  ngOnInit() {
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

  @HostListener('click', ['$event.target']) clickInside(e) {
    if (e.id == "expanded-img" || e.className != "gallery-img") return

    let expandImg = document.getElementById("expanded-img");
    // get the image text
    var imgText = document.getElementById("img-text");
    // use the same src in the expanded image as the image being clicked on from the grid
    (<HTMLImageElement>expandImg).src = e.src;
    // use the value of the alt attribute of the clickable image as text inside the expanded image
    imgText.innerHTML = e.alt;
    // show the container element (hidden with CSS)
    expandImg.parentElement.style.display = "block";
  }
}
