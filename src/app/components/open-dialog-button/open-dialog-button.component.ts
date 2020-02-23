import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { ImageDialogComponent } from "../image-dialog/image-dialog.component";
import { Image } from "../../interfaces/image";

@Component({
  selector: "app-open-dialog-button",
  templateUrl: "./open-dialog-button.component.html",
  styleUrls: ["./open-dialog-button.component.css"]
})
export class OpenDialogButtonComponent implements OnInit {
  @Input() images: Image[];
  @Output() imagesChange = new EventEmitter<boolean>();

  constructor(public dialog: MatDialog) {}

  ngOnInit(): void {}

  openDialog(): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.panelClass = "custom-dialog-container";
    dialogConfig.data = this.images;

    const dialogRef = this.dialog.open(ImageDialogComponent, dialogConfig);
  }
}
