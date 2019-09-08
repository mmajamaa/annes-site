import { Component, OnInit, HostListener } from '@angular/core';
import { TranslationsService } from '../../services/translations.service';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css']
})
export class GalleryComponent implements OnInit {

  public I18n = {};

  public images = [
    {src: './assets/pics/19.jpeg', alt: '19'},
    {src: './assets/pics/19.jpeg', alt: '29'},
    {src: './assets/pics/19.jpeg', alt: '39'},
    {src: './assets/pics/19.jpeg', alt: '49'},
    {src: './assets/pics/19.jpeg', alt: '59'},

  ]

  constructor(private translationsService: TranslationsService) { }

  ngOnInit() {
    this.translationsService.cast.subscribe(r => this.I18n = r);
  }

  @HostListener('click', ['$event.target']) clickInside(e) {
    if (e.id == "expanded-img" || e.className != "gallery-img") return

    let expandImg = document.getElementById("expanded-img");
    // Get the image text
    var imgText = document.getElementById("img-text");
    // Use the same src in the expanded image as the image being clicked on from the grid
    expandImg.src = e.src;
    // Use the value of the alt attribute of the clickable image as text inside the expanded image
    imgText.innerHTML = e.alt;
    // Show the container element (hidden with CSS)
    expandImg.parentElement.style.display = "block";
  }

  closeImg(e) {
    e.style.display = "none";
  }
}
