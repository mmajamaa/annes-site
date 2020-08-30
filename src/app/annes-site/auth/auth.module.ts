import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { FormsModule } from "@angular/forms";

import { NgxImageCompressService } from "ngx-image-compress";

import { AdminComponent } from "./admin/admin.component";
import { LoginComponent } from "./login/login.component";
import { UserBarComponent } from "./admin/user-bar/user-bar.component";
import { UploadComponentComponent } from "./admin/upload-component/upload-component.component";
import { ImageDialogComponent } from "./admin/image-dialog/image-dialog.component";
import { SpinnerOverlayComponent } from "../shared/spinner-overlay/spinner-overlay.component";
import { LoginResolver } from "./login/login-resolver.service";
import { DeactivateGuardService } from "./admin/deactivate-guard.service";
import { AuthGuard } from "./auth-guard.service";
import { SharedModule } from "../shared/shared.module";
import { ImageModalComponent } from "./admin/image-modal/image-modal.component";
import { NewSubGalleryFormComponent } from "./admin/new-sub-gallery-form/new-sub-gallery-form.component";

@NgModule({
  "declarations": [
    AdminComponent,
    LoginComponent,
    UserBarComponent,
    UploadComponentComponent,
    ImageDialogComponent,
    SpinnerOverlayComponent,
    ImageModalComponent,
    NewSubGalleryFormComponent,
  ],
  "imports": [
    RouterModule.forChild([
      { "path": "", "redirectTo": "admin", "pathMatch": "full" },
      {
        "path": "admin",
        "component": AdminComponent,
        "canActivate": [AuthGuard],
        "canDeactivate": [DeactivateGuardService],
      },
      {
        "path": "login",
        "component": LoginComponent,
        "resolve": { "authResolver": LoginResolver },
      },
    ]),
    FormsModule,
    SharedModule,
    CommonModule,
  ],
  "providers": [NgxImageCompressService],

  "entryComponents": [ImageDialogComponent, SpinnerOverlayComponent],
})
export class AuthModule {}
