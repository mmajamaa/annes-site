import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

const routes: Routes = [
  {
    path: "",
    loadChildren: () => import('./modules/main-page.module').then(m => m.MainPageModule)
  },
  {
    path: "auth",
    loadChildren: () => import('./modules/admin.module').then(m => m.AdminModule)
  },
  { path: "**", redirectTo: 'page-not-found' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule { }
