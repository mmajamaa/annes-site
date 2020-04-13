import { Component, OnInit} from "@angular/core";
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { ImageDialogComponent } from "../image-dialog/image-dialog.component";
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: "app-user-bar",
  templateUrl: "./user-bar.component.html",
  styleUrls: ["./user-bar.component.css"]
})
export class UserBarComponent implements OnInit {
  constructor(public dialog: MatDialog, private authenticationService: AuthenticationService) {}

  ngOnInit(): void {}

  openDialog(): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.panelClass = "custom-dialog-container";

    const dialogRef = this.dialog.open(ImageDialogComponent, dialogConfig);
  }

  logout() {
    this.authenticationService.logout();
  }
}
