import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { TranslationsService } from '../../translations.service';
import { RedirectService } from '../../redirect.service';
import { Subscription } from 'rxjs';
import { mainEmail, devEmail } from '../../../../data/variables';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit, OnDestroy {
  public I18n: any;
  private I18nSubscription: Subscription;
  public url: string;
  public mainEmail: string = mainEmail;
  public devEmail: string = devEmail;

  constructor(
    private translationsService: TranslationsService,
    private redirectService: RedirectService,
    @Inject(Window) private window: Window

  ) { }

  ngOnInit() {
    this.I18nSubscription = this.translationsService.I18n.subscribe(r => { this.I18n = r });
    this.url = this.window.location.hostname;
  }

  openIg() {
    this.redirectService.openIg();
  }

  ngOnDestroy() {
    this.I18nSubscription.unsubscribe();
  }
}
