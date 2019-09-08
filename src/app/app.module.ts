import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { HomeComponent } from "./components/home/home.component";
import { ContactComponent } from "./components/contact/contact.component";
import { CvComponent } from "./components/cv/cv.component";
import { GalleryComponent } from "./components/gallery/gallery.component";
import { TranslationsService } from './services/translations.service';
import { NavbarComponent} from "./components/navbar/navbar.component";
import { HttpClientModule } from "@angular/common/http";
import { FooterComponent } from './components/footer/footer.component';
import { RedirectService } from './services/redirect.service';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ContactComponent,
    CvComponent,
    GalleryComponent,
    NavbarComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [TranslationsService, RedirectService],
  bootstrap: [AppComponent]
})
export class AppModule { }
