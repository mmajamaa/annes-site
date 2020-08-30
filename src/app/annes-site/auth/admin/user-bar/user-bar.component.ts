import { Component } from "@angular/core";

import { FacadeService } from "../../../shared/facade/facade.service";

@Component({
  "selector": "app-user-bar",
  "templateUrl": "./user-bar.component.html",
  "styleUrls": ["./user-bar.component.css"],
})
export class UserBarComponent {
  public constructor(private facade: FacadeService) {}

  public logout(): void {
    this.facade.logoutRequested();
  }

  public onPublishChanges(): void {
    this.facade.subGalleriesPublishRequested();
  }
}
