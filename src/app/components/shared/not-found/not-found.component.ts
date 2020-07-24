import { Component, OnInit, OnDestroy } from '@angular/core';
import { TranslationsService } from '../../public/translations.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.css']
})
export class NotFoundComponent implements OnInit, OnDestroy {
  private translationsSubscription: Subscription;
  public I18n: any;

  constructor(private translations: TranslationsService) { }

  ngOnInit(): void {
    this.translationsSubscription = this.translations.I18n.subscribe(r => { this.I18n = r });
  }

  ngOnDestroy() {
    this.translationsSubscription.unsubscribe();
  }
}
