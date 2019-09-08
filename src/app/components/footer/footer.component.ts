import { Component, OnInit } from '@angular/core';
import { TranslationsService } from '../../services/translations.service';
import { RedirectService } from '../../services/redirect.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  public I18n = {};

  constructor(private translationsService: TranslationsService, private redirectService: RedirectService) { }

  ngOnInit() {
    this.translationsService.cast.subscribe(r => this.I18n = r);
  }

  redirect() {
    this.redirectService.redirect();
  }

  openIg() {
    this.redirectService.openIg();
  }
}
