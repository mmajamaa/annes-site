import { NgModule } from "@angular/core";
import { Routes, RouterModule, PreloadAllModules } from "@angular/router";

const routes: Routes = [
  {
    path: "auth",
    loadChildren: () => import('./modules/admin.module').then(m => m.AdminModule)
  },
  {
    path: "",
    loadChildren: () => import('./modules/main-page.module').then(m => m.MainPageModule)
  },
  { path: "**", redirectTo: 'page-not-found' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule { }
