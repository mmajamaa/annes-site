import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Image } from "./image";
import { SubGallery } from "./sub-gallery";
import { Observable, Subject, BehaviorSubject } from "rxjs";
import { SnackBarService } from "./snack-bar.service";

@Injectable({
  providedIn: "root",
})
export class ImagesService {
  private images: Image[] = [];
  private subGalleries: SubGallery[] = [];
  public imagesChange: BehaviorSubject<Image[]> = new BehaviorSubject([]);
  public subGalleriesChange: BehaviorSubject<
    SubGallery[]
  > = new BehaviorSubject([]);
  public uploadSuccesful: Subject<string> = new Subject();
  public errorLoadingImages: Subject<boolean>;
  public subGalleryCreationSuccessful: Subject<boolean> = new Subject();
  public currentSubGallery: Subject<string> = new Subject();

  constructor(
    private http: HttpClient,
    private snackBarService: SnackBarService
  ) {}

  uploadImage(uploadObject, galleryId) {
    const id = galleryId == null ? "" : galleryId;

    return this.http.post("/api/images/" + id, JSON.stringify(uploadObject), {
      observe: "body",
      params: new HttpParams().append(
        "token",
        JSON.parse(localStorage.getItem("user")).token
      ), // TODO: get from store
    });
  }

  public getSubGalleries(): SubGallery[] {
    return this.subGalleries.slice();
  }

  public getImages() {
    return this.images.slice();
  }

  deleteImage(id: string) {
    return this.http.delete("/api/image/" + id, {
      observe: "body",
      params: new HttpParams().append(
        "token",
        JSON.parse(localStorage.getItem("user")).token
      ),
    });
  }

  getSubGalleriesFromApi(url: string): Observable<SubGallery[]> {
    return this.http.get<SubGallery[]>(url);
  }

  createGallery(fi, en) {
    return this.http.post(
      "/api/gallerys",
      {
        en,
        fi,
      },
      {
        observe: "body",
        params: new HttpParams().append(
          "token",
          JSON.parse(localStorage.getItem("user")).token
        ),
      }
    );
  }

  deleteGallery(id) {
    return this.http.delete("/api/gallery/" + id, {
      observe: "body",
      params: new HttpParams().append(
        "token",
        JSON.parse(localStorage.getItem("user")).token
      ),
    });
  }

  saveOrder(images: Image[]) {
    this.http
      .post(
        "/api/saveorder/",
        { images },
        {
          observe: "body",
          params: new HttpParams().append(
            "token",
            localStorage.getItem("token")
          ),
        }
      )
      .subscribe(
        (images: Image[]) => {
          this.snackBarService.openSnackBar(
            "Muutokset tallennettiin onnistuneesti.",
            "ok-snackbar"
          );
        },
        (error) => {
          this.snackBarService.openSnackBar(
            "Virhe muutosten tallentamisessa. Yritä uudelleen.",
            "warn-snackbar"
          );
        }
      );
  }

  updateSubGalleries(subGalleries: SubGallery[]) {
    return this.http.post(
      "/api/galleries/update",
      { subGalleries },
      {
        observe: "body",
        params: new HttpParams().append(
          "token",
          JSON.parse(localStorage.getItem("user")).token
        ),
      }
    );
  }
}