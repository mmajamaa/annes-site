import { Component, OnInit, HostListener } from '@angular/core';
import { TranslationsService } from '../../services/translations.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  public I18n = {};
  public images = [
    {src: "./assets/uk.png", alt: "uk"},
    {src: "./assets/fi.png", alt: "fi"}
  ];
  public image = this.images[0];

  // TODO: fix/remove this
  @HostListener('click', ['$event.target']) clickInside(e) {
    if (e.className != 'router-link') return
    Array.from(document.getElementsByClassName('router-link')).forEach(r => {
      r.className = 'router-link'
    })
    e.className += ' active';
  }

  constructor(private translationsService: TranslationsService) { }

  ngOnInit() {
    this.translationsService.cast.subscribe(r => this.I18n = r);
  }

  toggleLanguage() {
    this.translationsService.toggleLanguage();
    this.image = this.image == this.images[0] ? this.images[1] : this.images[0];
  }

  toggleNavbar() {
    let x = document.getElementById("myTopnav");
    if (x.className === "topnav") {
      x.className += " responsive";
    } else {
      x.className = "topnav";
    }
  }

  activate(e) {
    console.log(document.getElementById(e.target.id).className)
  }
}
