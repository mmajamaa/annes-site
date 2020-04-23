import { Injectable, } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Image } from "../interfaces/image";
import { SubGallery } from "../interfaces/sub-gallery";
import { Observable, Subject, BehaviorSubject } from "rxjs";
import { SnackBarService } from './snack-bar.service';

@Injectable({
  providedIn: "root"
})
export class ImagesService {
  private images: Image[] = [];
  private subGalleries: SubGallery[] = [];
  public imagesChange: BehaviorSubject<Image[]> = new BehaviorSubject([]);
  public subGalleriesChange: BehaviorSubject<SubGallery[]> = new BehaviorSubject([]);
  public uploadSuccesful: Subject<string> = new Subject();
  public errorLoadingImages: Subject<boolean>;

  constructor(private http: HttpClient, private snackBarService: SnackBarService) {
    this.onInit();
  }

  onInit() {
    // get images
    this.getImagesFromApi().subscribe((images: Image[]) => {
      this.images = images;
      this.imagesChange.next(this.images.slice());
    },
    error => {
      this.snackBarService.openSnackBar(
        "Virhe kuvien lataamisessa. Päivitä sivu.",
        "warn-snackbar"
      );
    })
    // get galleries
    this.getSubGalleriesFromApi().subscribe((subGalleries: SubGallery[]) => {
      this.subGalleries = subGalleries;
      this.subGalleriesChange.next(this.subGalleries.slice())
    },
    error => {
      this.snackBarService.openSnackBar(
        "Virhe alagallerioiden lataamisessa. Päivitä sivu",
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
      for (let i = 0; i < this.subGalleries.length; i++) {
        if (this.subGalleries[i]._id == galleryId) {
          this.subGalleries[i].images.push(newImage);
          break;
        }
      }
      this.subGalleriesChange.next(this.subGalleries.slice());
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

  public getSubGalleries(): SubGallery[] {
    return this.subGalleries.slice();
  }

  public getImages() {
    return this.images.slice();
  }

  deleteImage(id: string) {
    this.http.delete("/api/image/" + id, {
      observe: "body",
      params: new HttpParams().append("token", localStorage.getItem("token"))
    }).subscribe((deletedImage: Image) => {
      for (let i = 0; i < this.subGalleries.length; i++) {
        for (let j = 0; j < this.subGalleries[i].images.length; j++) {
          if (this.subGalleries[i].images[j]._id === id) {
            this.subGalleries[i].images = this.subGalleries[i].images.filter((image: Image) => image._id !== id);
            break;
          }
        }
      }
      this.subGalleriesChange.next(this.subGalleries.slice());
      this.snackBarService.openSnackBar("Kuva poistettiin onnistuneesti.", "ok-snackbar");
    }, 
      error => {
        this.snackBarService.openSnackBar(
          "Virhe kuvan poistamisessa. Yritä uudelleen.",
          "warn-snackbar"
        );
    }
    );
  }

  getSubGalleriesFromApi(): Observable<SubGallery[]> {
    return this.http.get<SubGallery[]>("/api/gallerys");
  }

  createGallery(fi, en) {
    this.http.post(
      "/api/gallerys",
      {
        en,
        fi
      },
      {
        observe: "body",
        params: new HttpParams().append("token", localStorage.getItem("token"))
      }
    ).subscribe(
      (newSubGallery: SubGallery) => {
        this.subGalleries.push(newSubGallery);
        this.subGalleriesChange.next(this.subGalleries.slice());
        this.snackBarService.openSnackBar("Galleria luotiin onnistuneesti.", "ok-snackbar");
      },
      error => {
        this.snackBarService.openSnackBar("Virhe gallerien luomisessa.", "warn-snackbar");
      }
    )
  }

  deleteGallery(id) {
    this.http.delete("/api/gallery/" + id, {
      observe: "body",
      params: new HttpParams().append("token", localStorage.getItem("token"))
    }).subscribe((deletedSubGallery: SubGallery) => {
      this.subGalleries = this.subGalleries.filter(sg => sg._id != deletedSubGallery._id);
      this.subGalleriesChange.next(this.subGalleries.slice());
      this.snackBarService.openSnackBar("Galleria poistettiin onnistuneesti.", "ok-snackbar");
    },
    error => {
      this.snackBarService.openSnackBar("Virhe gallerien poistamisessa. Yritä uudelleen.", "warn-snackbar");
    });
  }

  saveOrder(images: Image[]) {
    this.http.post("/api/saveorder/", {images}, {
      observe: "body",
      params: new HttpParams().append("token", localStorage.getItem("token"))
    }).subscribe((images: Image[]) => {
      this.snackBarService.openSnackBar("Muutokset tallennettiin onnistuneesti.", "ok-snackbar");
      },
      error => {
        this.snackBarService.openSnackBar("Virhe muutosten tallentamisessa. Yritä uudelleen.", "warn-snackbar");
      });
  }

  updateSubGalleries(subGalleries: SubGallery[]) {
    this.http.post("/api/galleries/update", { subGalleries }, {
      observe: "body",
      params: new HttpParams().append("token", localStorage.getItem("token"))
    }).subscribe((updatedSubGalleries: SubGallery[]) => {
      this.subGalleries = updatedSubGalleries;
      this.subGalleriesChange.next(this.subGalleries);
      this.snackBarService.openSnackBar("Muutokset tallennettiin onnistuneesti.", "ok-snackbar");
    },
    error => {
      this.snackBarService.openSnackBar("Virhe muutosten tallentamisessa. Yritä uudelleen.", "warn-snackbar");
    })
  }
}
