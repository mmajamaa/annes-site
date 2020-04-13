import { Component, OnInit, OnDestroy } from '@angular/core';
import { TranslationsService } from '../../services/translations.service';
import { RedirectService } from '../../services/redirect.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit, OnDestroy {
  public I18n:any;
  private I18nSubscription: Subscription;

  constructor(private translationsService: TranslationsService, private redirectService: RedirectService) { }

  ngOnInit() {
    this.I18nSubscription = this.translationsService.I18n.subscribe(r => {this.I18n = r});
  }

  redirect() {
    this.redirectService.redirect();
  }

  openIg() {
    this.redirectService.openIg();
  }

  ngOnDestroy() {
    this.I18nSubscription.unsubscribe();
  }
}
