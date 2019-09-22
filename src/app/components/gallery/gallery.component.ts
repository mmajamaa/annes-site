import { Component, OnInit, HostListener } from '@angular/core';
import { TranslationsService } from '../../services/translations.service';
import { Image } from '../../interfaces/image';
import { Router, NavigationStart } from '@angular/router';
import { SubGalleryComponent } from '../sub-gallery/sub-gallery.component';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css']
})
export class GalleryComponent implements OnInit {
  public I18n:any;

  // todo: change to dynamic
  gallerys: any = [{id: 'prints', name: 'Vedokset'}, {id: 'paintings', name: 'Maalaukset'}]

  constructor(private translationsService: TranslationsService,
              private router: Router) {
              }

  ngOnInit() {
    this.translationsService.cast.subscribe(res => this.I18n = res);
  }

  @HostListener('click', ['$event.target']) clickInside(e) {
    if (e.className == 'sub-router-link') {
      Array.from(document.getElementsByClassName('sub-router-link')).forEach(r => {
        r.className = 'sub-router-link'
      })
      e.className += ' active';
    }
  }
}
