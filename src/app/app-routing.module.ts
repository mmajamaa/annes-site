import { NgModule } from "@angular/core";
import { Routes, RouterModule, CanActivate } from "@angular/router";

import { HomeComponent } from "./components/home/home.component";
import { ContactComponent } from "./components/contact/contact.component";
import { CvComponent } from "./components/cv/cv.component";
import { GalleryComponent } from "./components/gallery/gallery.component";
import { AdminComponent } from "./components/admin/admin.component";
import { LayoutComponent } from "./_layout/layout/layout.component";
import { LoginComponent } from "./components/login/login.component";
import { AdminResolver } from './services/admin-resolver.service'
import { LoginResolver } from './services/login-resolver.service';

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
      }
    ]
  },

  // no layout routes
  {
    path: "admin",
    component: AdminComponent,
    resolve: {authResolver: AdminResolver}
  },
  {
    path: "login",
    component: LoginComponent,
    resolve: {authResolver: LoginResolver}
  },
  { path: "**", redirectTo: "home" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule {}
