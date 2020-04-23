import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router'
import { Subscription } from 'rxjs';

import { ImagesService } from '../../services/images.service';
import { TranslationsService } from '../../services/translations.service';
import { SubGallery } from '../../interfaces/sub-gallery';

@Component({
  selector: 'app-sub-gallery',
  templateUrl: './sub-gallery.component.html',
  styleUrls: ['./sub-gallery.component.css']
})
export class SubGalleryComponent implements OnInit, OnDestroy {
  public subGallery: SubGallery;
  private subGallerySubscription: Subscription = new Subscription();
  private langSubscription: Subscription;
  public language: string;
  public subGalleryName: string;

  constructor(private route: ActivatedRoute, private img: ImagesService, private translationsService: TranslationsService) { }

  ngOnInit(): void {

    this.langSubscription = this.translationsService.lang.subscribe(r => { this.language = r });

    this.route.params.subscribe((params: Params) => {
      this.subGallerySubscription.unsubscribe();
      this.subGalleryName = params['en'];
      this.subGallerySubscription = this.img.subGalleriesChange.subscribe((subGalleries: SubGallery[]) => {
        this.subGallery = subGalleries.filter((subGallery: SubGallery) => subGallery.en === this.route.snapshot.params['en'])[0];
      })
    })
  }

  ngOnDestroy() {
    this.subGallerySubscription.unsubscribe();
    this.langSubscription.unsubscribe();
  }
}
