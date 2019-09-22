import { Component, OnInit } from '@angular/core';
import { TranslationsService } from '../../services/translations.service';
import { RedirectService } from '../../services/redirect.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  public I18n:any;

  constructor(private translationsService: TranslationsService, private redirectService: RedirectService) { }

  ngOnInit() {
    this.translationsService.cast.subscribe(r => this.I18n = r);
  }

  openIg() {
    this.redirectService.openIg();
  }

  mail() {
    window.location.href = 'mailto:anne';
  }
}
