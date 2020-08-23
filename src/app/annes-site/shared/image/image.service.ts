import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Image } from "./image";
import { SubGallery } from "../sub-gallery/sub-gallery";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class ImagesService {
  constructor(private http: HttpClient) {}

  uploadImage(uploadObject, galleryId) {
    return this.http.post(
      environment.baseUrl + "/api/images/" + galleryId,
      JSON.stringify(uploadObject),
      {
        observe: "body",
        params: new HttpParams().append(
          "token",
          JSON.parse(localStorage.getItem("user")).token
        ), // TODO: get from store
      }
    );
  }

  deleteImage(id: string) {
    return this.http.delete(environment.baseUrl + "/api/images/" + id, {
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
      environment.baseUrl + "/api/galleries",
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
    return this.http.delete(environment.baseUrl + "/api/galleries/" + id, {
      observe: "body",
      params: new HttpParams().append(
        "token",
        JSON.parse(localStorage.getItem("user")).token
      ),
    });
  }

  putImages(images: Image[]) {
    this.http.put(
      environment.baseUrl + "/api/images/",
      { images },
      {
        observe: "body",
        params: new HttpParams().append("token", localStorage.getItem("token")),
      }
    );
  }

  updateSubGalleries(subGalleries: SubGallery[]) {
    return this.http.put(
      environment.baseUrl + "/api/galleries",
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
