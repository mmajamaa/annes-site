import { Component, Output, EventEmitter } from "@angular/core";

import { FacadeService } from "../../../shared/facade.service";
import { AuthenticationService } from "../../authentication.service";

@Component({
  selector: "app-user-bar",
  templateUrl: "./user-bar.component.html",
  styleUrls: ["./user-bar.component.css"],
})
export class UserBarComponent {
  @Output() onSaveChanges = new EventEmitter();
  constructor(
    private authenticationService: AuthenticationService,
    private facade: FacadeService
  ) {}

  logout() {
    this.facade.logoutRequested();
  }
}
