import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { HomeComponent } from "./components/home/home.component";
import { ContactComponent } from "./components/contact/contact.component";
import { CvComponent } from "./components/cv/cv.component";
import { GalleryComponent } from "./components/gallery/gallery.component";
import { AdminComponent } from "./components/admin/admin.component";
import { LayoutComponent } from "./_layout/layout/layout.component"
import { LoginComponent } from "./components/login/login.component";
import { AuthenticationGuard } from './authentication.guard';

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
        component: GalleryComponent
      },
    ]
  },

  // no layout routes
  {
    path: "admin",
    component: AdminComponent,
    canActivate: [AuthenticationGuard]
  },
  {
    path: "login",
    component: LoginComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [
    AuthenticationGuard
  ],
})
export class AppRoutingModule { }
