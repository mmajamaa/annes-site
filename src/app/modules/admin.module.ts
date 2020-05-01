import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { NgxImageCompressService } from "ngx-image-compress";

import { AdminComponent } from "../components/admin/admin.component";
import { LoginComponent } from "../components/login/login.component";
import { UserBarComponent } from "../components/user-bar/user-bar.component";
import { UploadComponentComponent } from "../components/upload-component/upload-component.component";
import { ImageDialogComponent } from '../components/image-dialog/image-dialog.component';
import { SpinnerOverlayComponent } from '../components/spinner-overlay/spinner-overlay.component';
import { LoginResolver } from '../services/login-resolver.service';
import { DeactivateGuardService } from '../services/deactivate-guard.service';
import { AuthGuard } from '../services/auth-guard.service';
import { SharedModule } from './shared.module';

@NgModule({
    declarations: [
        AdminComponent,
        LoginComponent,
        UserBarComponent,
        UploadComponentComponent,
        ImageDialogComponent,
        SpinnerOverlayComponent,
    ],
    imports: [
        RouterModule.forChild([
            { path: "", redirectTo: "admin", pathMatch: "full" },
            {
                path: "admin",
                component: AdminComponent,
                canActivate: [AuthGuard],
                canDeactivate: [DeactivateGuardService]
            },
            {
                path: "login",
                component: LoginComponent,
                resolve: { authResolver: LoginResolver }
            }
        ]),
        FormsModule,
        SharedModule,
        CommonModule,
    ],
    providers: [NgxImageCompressService],

    entryComponents: [ImageDialogComponent, SpinnerOverlayComponent]
})
export class AdminModule { }