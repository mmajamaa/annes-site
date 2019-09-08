import { Component, OnInit } from '@angular/core';
import { TranslationsService } from '../../services/translations.service';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css']
})
export class GalleryComponent implements OnInit {

  public I18n = {};

  constructor(private translationsService: TranslationsService) { }

  ngOnInit() {
    this.translationsService.cast.subscribe(r => this.I18n = r);
  }

}
