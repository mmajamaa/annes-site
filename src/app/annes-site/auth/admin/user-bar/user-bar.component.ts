import { Component, Output, EventEmitter } from "@angular/core";

import { FacadeService } from "../../../shared/facade/facade.service";

@Component({
  selector: "app-user-bar",
  templateUrl: "./user-bar.component.html",
  styleUrls: ["./user-bar.component.css"],
})
export class UserBarComponent {
  @Output() onPublishChanges = new EventEmitter();
  constructor(private facade: FacadeService) {}

  logout() {
    this.facade.logoutRequested();
  }
}
