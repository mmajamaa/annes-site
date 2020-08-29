import { Component, OnInit } from "@angular/core";
import { MatDialogRef } from "@angular/material/dialog";
import { BreakpointObserver, BreakpointState } from "@angular/cdk/layout";

@Component({
  "selector": "app-image-dialog",
  "templateUrl": "./image-dialog.component.html",
  "styleUrls": ["./image-dialog.component.css"],
})
export class ImageDialogComponent implements OnInit {
  public galleryId: string;

  public constructor(
    public dialogRef: MatDialogRef<ImageDialogComponent>,
    public breakpointObserver: BreakpointObserver
  ) {}

  public onNoClick(): void {
    this.dialogRef.close();
  }

  public ngOnInit(): void {
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
