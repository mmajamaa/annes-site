import { Component, OnInit, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { Image } from "../../interfaces/image";

@Component({
  selector: "app-image-dialog",
  templateUrl: "./image-dialog.component.html",
  styleUrls: ["./image-dialog.component.css"]
})
export class ImageDialogComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<ImageDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public images: Image[]
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {}
}
