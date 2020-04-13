import { Component, OnInit, OnDestroy } from '@angular/core';
import { TranslationsService } from '../../services/translations.service';
import { RedirectService } from '../../services/redirect.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit, OnDestroy {
  public I18n:any;
  private I18nSubscription: Subscription;

  constructor(private translationsService: TranslationsService, private redirectService: RedirectService) { }

  ngOnInit() {
    this.I18nSubscription = this.translationsService.I18n.subscribe(r => {this.I18n = r});
  }

  openIg() {
    this.redirectService.openIg();
  }

  mail() {
    window.location.href = 'mailto:anne';
  }

  ngOnDestroy() {
    this.I18nSubscription.unsubscribe();
  }
}
