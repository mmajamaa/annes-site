import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { HomeComponent } from "./components/home/home.component";
import { ContactComponent } from "./components/contact/contact.component";
import { CvComponent } from "./components/cv/cv.component";
import { GalleryComponent } from "./components/gallery/gallery.component";
import { NavbarComponent} from "./_layout/navbar/navbar.component";
import { HttpClientModule } from "@angular/common/http";
import { FooterComponent } from './_layout/footer/footer.component';
import { ImageUploadComponent } from './components/image-upload/image-upload.component';
import { AdminComponent } from './components/admin/admin.component';
import { LayoutComponent } from './_layout/layout/layout.component';
import { LoginComponent } from './components/login/login.component';
import { FormsModule } from '@angular/forms';

// services
import { TranslationsService } from './services/translations.service';
import { RedirectService } from './services/redirect.service';
import { AuthenticationService } from './services/authentication.service';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ContactComponent,
    CvComponent,
    GalleryComponent,
    NavbarComponent,
    FooterComponent,
    ImageUploadComponent,
    AdminComponent,
    LayoutComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [
    TranslationsService,
    RedirectService,
    AuthenticationService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
