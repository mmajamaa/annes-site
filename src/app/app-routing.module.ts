import { NgModule } from "@angular/core";
import { Routes, RouterModule, CanActivate } from "@angular/router";

import { HomeComponent } from "./components/home/home.component";
import { ContactComponent } from "./components/contact/contact.component";
import { CvComponent } from "./components/cv/cv.component";
import { GalleryComponent } from "./components/gallery/gallery.component";
import { AdminComponent } from "./components/admin/admin.component";
import { LayoutComponent } from "./_layout/layout/layout.component";
import { LoginComponent } from "./components/login/login.component";
import { LoginResolver } from './services/login-resolver.service';
import { AuthGuard } from './services/auth-guard.service';
import { DeactivateGuardService } from './services/deactivate-guard.service';
import { NotFoundComponent } from './components/not-found/not-found.component';

const routes: Routes = [
  // site routes
  {
    path: "",
    component: LayoutComponent,
    children: [
      {
        path: "",
        pathMatch: "full",
        redirectTo: "home"
      },
      {
        path: "home",
        component: HomeComponent
      },
      {
        path: "contact",
        component: ContactComponent
      },
      {
        path: "cv",
        component: CvComponent
      },
      {
        path: "gallery",
        component: GalleryComponent,
      },
      {
        path: 'page-not-found',
        component: NotFoundComponent
      }
    ]
  },

  // no layout routes
  {
    path: "admin",
    component: AdminComponent,
    canActivate: [AuthGuard],
    canDeactivate: [DeactivateGuardService]
  },
  {
    path: "login",
    component: LoginComponent,
    resolve: {authResolver: LoginResolver}
  },
  { path: "**", redirectTo: 'page-not-found' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule {}
