import { Component, OnInit, HostListener } from '@angular/core';
import { TranslationsService } from '../../services/translations.service';
import { ImagesService } from '../../services/images.service';
import { Image } from '../../interfaces/image';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css']
})
export class GalleryComponent implements OnInit {
  public I18n = {};
  public images: Image[];

  constructor(private translationsService: TranslationsService,
              private imagesService: ImagesService) { }

  ngOnInit() {
    this.translationsService.cast.subscribe(res => this.I18n = res);

    this.imagesService.getImages().subscribe(res => {
      console.log(res)
      this.images = res;
    })
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

  closeImg(e) {
    e.style.display = "none";
  }
}
