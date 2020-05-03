import { Component, Output, EventEmitter } from "@angular/core";

import { AuthenticationService } from '../../services/authentication.service';
import { FacadeService } from '../../store/facade.service';

@Component({
  selector: "app-user-bar",
  templateUrl: "./user-bar.component.html",
  styleUrls: ["./user-bar.component.css"]
})
export class UserBarComponent {
  @Output() onSaveChanges = new EventEmitter();
  constructor(private authenticationService: AuthenticationService, private facade: FacadeService) { }

  logout() {
    this.facade.logoutRequested();
  }
}
