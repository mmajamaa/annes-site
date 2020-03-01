import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Image } from "../interfaces/image";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class ImagesService {
  constructor(private http: HttpClient) {}

  uploadImage(uploadObject, galleryId) {
    const id = galleryId == null ? "" : galleryId;

    return this.http.post("/api/images/" + id, JSON.stringify(uploadObject), {
      observe: "body",
      params: new HttpParams().append("token", localStorage.getItem("token"))
    });
  }

  public getImages(): Observable<Image[]> {
    return this.http.get<Image[]>("/api/images/");
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
