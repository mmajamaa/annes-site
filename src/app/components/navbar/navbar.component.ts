import { Component, OnInit, HostListener } from '@angular/core';
import { TranslationsService } from '../../services/translations.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  public I18n = {};

  // TODO: fix/remove this
  @HostListener('click', ['$event.target']) clickInside(e) {
    return
    console.log(e)
    if (e.tagName != 'A') return
    Array.from(document.getElementsByTagName('a')).forEach(a => {
      a.className = ''
    })
    e.className = 'active';
  }

  constructor(private translationsService: TranslationsService) { }

  ngOnInit() {
    this.translationsService.cast.subscribe(r => this.I18n = r);
  }

  toggleLanguage() {
    this.translationsService.toggleLanguage();

    Array.from(document.getElementsByClassName("flag")).forEach((f) => {
      if (!f.className.split(' ')[1]) {
        f.className += ' hide';
      } else {
        f.className = 'flag';
      }
    })
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
