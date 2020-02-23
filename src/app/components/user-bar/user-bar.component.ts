import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { Image } from "../../interfaces/image";

@Component({
  selector: "app-user-bar",
  templateUrl: "./user-bar.component.html",
  styleUrls: ["./user-bar.component.css"]
})
export class UserBarComponent implements OnInit {
  constructor() {}
  @Input() images: Image[];
  @Output() imagesChange = new EventEmitter<boolean>();

  ngOnInit(): void {}
}
