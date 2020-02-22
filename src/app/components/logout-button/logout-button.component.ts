import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "app-logout-button",
  templateUrl: "./logout-button.component.html",
  styleUrls: ["./logout-button.component.css"]
})
export class LogoutButtonComponent implements OnInit {
  constructor(public router: Router) {}

  ngOnInit(): void {}

  logout() {
    localStorage.removeItem("token");
    this.router.navigate(["/login"]);
  }
}
