import { Injectable, } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Image } from "../interfaces/image";
import { Observable, Subject, BehaviorSubject } from "rxjs";
import { SnackBarService } from './snack-bar.service';

@Injectable({
  providedIn: "root"
})
export class ImagesService {
  private images: Image[] = [];
  public imagesChange: BehaviorSubject<Image[]> = new BehaviorSubject([]);
  public uploadSuccesful: BehaviorSubject<string> = new BehaviorSubject('start');
  public errorLoadingImages: Subject<boolean>;

  constructor(private http: HttpClient, private snackBarService: SnackBarService) {
    this.onInit();
  }

  onInit() {
    this.getImagesFromApi().subscribe((images: Image[]) => {
      this.images = images;
      this.imagesChange.next(this.images);
    },
    error => {
      this.snackBarService.openSnackBar(
        "Virhe kuvan poistamisessa. Yritä uudelleen.",
        "warn-snackbar"
      );
    })
  }

  uploadImage(uploadObject, galleryId) {
    const id = galleryId == null ? "" : galleryId;

    this.http.post("/api/images/" + id, JSON.stringify(uploadObject), {
      observe: "body",
      params: new HttpParams().append("token", localStorage.getItem("token"))
    }).subscribe((newImage: Image) => {
      this.images.push(newImage);
      this.imagesChange.next(this.images);
      this.snackBarService.openSnackBar("Kuva ladattiin onnistuneesti.", "ok-snackbar");
      this.uploadSuccesful.next('completed');
    },
      error => {
        this.snackBarService.openSnackBar(
          "Virhe kuvan lataamisessa. Yritä uudestaan.",
          "warn-snackbar"
        )
        this.uploadSuccesful.next('cancelled');
      }
    );
  }

  public getImagesFromApi(): Observable<Image[]> {
    return this.http.get<Image[]>("/api/images/");
  }

  public getImages() {
    return this.images.slice();
  }

  deleteImage(key) {
    return this.http.delete("/api/image/" + key, {
      observe: "body",
      params: new HttpParams().append("token", localStorage.getItem("token"))
    });
  }

  getGallerys() {
    return this.http.get("/api/gallerys");
  }

  createGallery(fi, en) {
    return this.http.post(
      "/api/gallerys",
      {
        en,
        fi
      },
      {
        observe: "body",
        params: new HttpParams().append("token", localStorage.getItem("token"))
      }
    );
  }

  deleteGallery(id) {
    return this.http.delete("/api/gallery/" + id, {
      observe: "body",
      params: new HttpParams().append("token", localStorage.getItem("token"))
    });
  }

  saveOrder(images) {
    return this.http.post("/api/saveorder/", images, {
      observe: "body",
      params: new HttpParams().append("token", localStorage.getItem("token"))
    });
  }
}
