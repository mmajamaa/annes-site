import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router'
import { Subscription } from 'rxjs';

import { ImagesService } from '../../shared/images.service';
import { TranslationsService } from '../translations.service';
import { SubGallery } from '../../shared/sub-gallery';

@Component({
  selector: 'app-sub-gallery',
  templateUrl: './sub-gallery.component.html',
  styleUrls: ['./sub-gallery.component.css']
})
export class SubGalleryComponent implements OnInit, OnDestroy {
  public subGallery: SubGallery;
  public subGalleries: SubGallery[] = [];
  private subGallerySubscription: Subscription = new Subscription();
  private langSubscription: Subscription;
  public language: string;
  public subGalleryName: string;
  public I18n: any;
  public I18nSubscription: Subscription;

  constructor(private route: ActivatedRoute, private img: ImagesService, private translationsService: TranslationsService) { }

  ngOnInit(): void {
    this.I18nSubscription = this.translationsService.I18n.subscribe(res => { this.I18n = res });

    this.langSubscription = this.translationsService.lang.subscribe(r => { this.language = r });

    this.route.params.subscribe((params: Params) => {
      this.subGallerySubscription.unsubscribe();
      this.subGalleryName = params['en'];
      this.setSubGallery();
    })

    this.subGallerySubscription = this.img.subGalleriesChange.subscribe((subGalleries: SubGallery[]) => {
      this.subGalleries = subGalleries;
      this.setSubGallery();
    })
  }

  setSubGallery() {
    if (this.subGalleries.length > 0 && this.subGalleryName) {
      this.subGallery = this.subGalleries.filter((subGallery: SubGallery) => subGallery.en.toLowerCase() === this.subGalleryName)[0];
    }
  }

  ngOnDestroy() {
    this.subGallerySubscription.unsubscribe();
    this.langSubscription.unsubscribe();
    this.I18nSubscription.unsubscribe();
  }
}
