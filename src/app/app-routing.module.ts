import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { HomeComponent } from "./home/home.component";
import { ContactComponent } from "./contact/contact.component";
import { CvComponent } from "./cv/cv.component";
import { GalleryComponent } from "./gallery/gallery.component";


const routes: Routes = [
  {path: "home", component: HomeComponent},
  {path: "contact", component: ContactComponent},
  {path: "cv", component: CvComponent},
  {path: "gallery", component: GalleryComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
