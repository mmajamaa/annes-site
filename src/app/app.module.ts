import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { HomeComponent } from "./components/home/home.component";
import { ContactComponent } from "./components/contact/contact.component";
import { CvComponent } from "./components/cv/cv.component";
import { GalleryComponent } from "./components/gallery/gallery.component";
import { NavbarComponent } from "./_layout/navbar/navbar.component";
import { HttpClientModule } from "@angular/common/http";
import { FooterComponent } from "./_layout/footer/footer.component";
import { AdminComponent } from "./components/admin/admin.component";
import { LayoutComponent } from "./_layout/layout/layout.component";
import { LoginComponent } from "./components/login/login.component";
import { FormsModule } from "@angular/forms";
import { SubGalleryComponent } from "./components/sub-gallery/sub-gallery.component";
import { FlexLayoutModule } from "@angular/flex-layout";
import { MaterialModule } from "./modules/material/material.module";
import { TranslationsService } from "./services/translations.service";
import { RedirectService } from "./services/redirect.service";
import { AuthenticationService } from "./services/authentication.service";
import { ImagesService } from "./services/images.service";
import { UserBarComponent } from "./components/user-bar/user-bar.component";
import { LogoutButtonComponent } from "./components/logout-button/logout-button.component";
import { ImageDialogComponent } from "./components/image-dialog/image-dialog.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { UploadComponentComponent } from "./components/upload-component/upload-component.component";

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ContactComponent,
    CvComponent,
    GalleryComponent,
    NavbarComponent,
    FooterComponent,
    AdminComponent,
    LayoutComponent,
    LoginComponent,
    SubGalleryComponent,
    UserBarComponent,
    LogoutButtonComponent,
    ImageDialogComponent,
    UploadComponentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    FlexLayoutModule,
    MaterialModule,
    BrowserAnimationsModule
  ],
  providers: [
    TranslationsService,
    RedirectService,
    AuthenticationService,
    ImagesService
  ],
  bootstrap: [AppComponent],
  entryComponents: [ImageDialogComponent]
})
export class AppModule {}
