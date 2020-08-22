import { NgModule } from "@angular/core";
import { Routes, RouterModule, PreloadAllModules } from "@angular/router";

const routes: Routes = [
  {
    path: "auth",
    loadChildren: () =>
      import("./components/auth/auth.module").then((m) => m.AuthModule),
  },
  {
    path: "",
    loadChildren: () =>
      import("./components/public/main-page.module").then(
        (m) => m.MainPageModule
      ),
  },
  { path: "**", redirectTo: "page-not-found" },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
  providers: [],
})
export class AppRoutingModule {}
