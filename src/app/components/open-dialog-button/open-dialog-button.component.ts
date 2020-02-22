import { Component, OnInit } from "@angular/core";
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { ImageDialogComponent } from "../image-dialog/image-dialog.component";

@Component({
  selector: "app-open-dialog-button",
  templateUrl: "./open-dialog-button.component.html",
  styleUrls: ["./open-dialog-button.component.css"]
})
export class OpenDialogButtonComponent implements OnInit {
  constructor(public dialog: MatDialog) {}

  ngOnInit(): void {}

  openDialog(): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.panelClass = "custom-dialog-container";

    const dialogRef = this.dialog.open(ImageDialogComponent, dialogConfig);
  }
}
