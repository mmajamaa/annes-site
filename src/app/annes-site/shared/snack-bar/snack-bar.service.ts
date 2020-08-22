import { Injectable } from "@angular/core";

import { MatSnackBar, MatSnackBarConfig } from "@angular/material/snack-bar";
import { SnackBarComponent } from "./snack-bar.component";

@Injectable({
  providedIn: "root",
})
export class SnackBarService {
  constructor(private snackBar: MatSnackBar) {}

  openSnackBar(message, panelClass) {
    const config = new MatSnackBarConfig();
    config.duration = 2000;
    config.panelClass = [panelClass];
    config.data = message;

    this.snackBar.openFromComponent(SnackBarComponent, config);
  }
}
