import { Component, OnInit } from '@angular/core';
import { TranslationsService } from '../../services/translations.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public I18n = {};

  constructor(private translationsService: TranslationsService) { }

  ngOnInit() {
    this.translationsService.cast.subscribe(r => this.I18n = r);
  }

}
