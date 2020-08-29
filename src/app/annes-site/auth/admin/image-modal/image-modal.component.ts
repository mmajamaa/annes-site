import { Component } from "@angular/core";

@Component({
  "selector": "app-image-modal",
  "templateUrl": "./image-modal.component.html",
  "styleUrls": ["./image-modal.component.css"],
})
export class ImageModalComponent {
  public openImage(target: HTMLImageElement): void {
    const modal: HTMLElement = document.getElementById("myModal");
    const modalImg: HTMLElement = document.getElementById("img01");
    const captionText: HTMLElement = document.getElementById("caption");
    modal.style.display = "block";
    (modalImg as HTMLImageElement).src = target.src;
    captionText.innerHTML = target.alt;
  }

  public closeModal(): void {
    const modal: HTMLElement = document.getElementById("myModal");
    modal.style.display = "none";
  }
}
