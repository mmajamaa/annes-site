import { Component, OnInit, Inject, HostListener } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { Image } from "../../interfaces/image";
import { BreakpointObserver, BreakpointState } from "@angular/cdk/layout";

@Component({
  selector: "app-image-dialog",
  templateUrl: "./image-dialog.component.html",
  styleUrls: ["./image-dialog.component.css"]
})
export class ImageDialogComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<ImageDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public images: Image[],
    public breakpointObserver: BreakpointObserver
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {
    this.breakpointObserver
      .observe(["(min-width: 600px)"])
      .subscribe((state: BreakpointState) => {
        if (state.matches) {
          this.dialogRef.updateSize("50%");
        } else {
          this.dialogRef.updateSize("80%");
        }
      });
  }
}
