import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { ImageStoreObj, ImageUploadObj, ImageChanges } from "./image";
import { Observable } from "rxjs";
import { environment } from "../../../../environments/environment";

@Injectable({
  "providedIn": "root",
})
export class ImagesService {
  public constructor(private readonly http: HttpClient) {}

  public postImage(
    uploadObject: ImageUploadObj,
    galleryId: string
  ): Observable<ImageStoreObj> {
    return this.http.post<ImageStoreObj>(
      `${environment.baseUrl}/api/images/${galleryId}`,
      JSON.stringify(uploadObject),
      {
        "observe": "body",
        "params": new HttpParams().append(
          "token",
          JSON.parse(localStorage.getItem("user")).token
        ), // TODO: get from store
      }
    );
  }

  public deleteImage(id: string): Observable<ImageStoreObj> {
    return this.http.delete<ImageStoreObj>(
      `${environment.baseUrl}/api/images/${id}`,
      {
        "observe": "body",
        "params": new HttpParams().append(
          "token",
          JSON.parse(localStorage.getItem("user")).token
        ),
      }
    );
  }

  public putImages(images: ImageChanges[]): Observable<void> {
    return this.http.put<void>(
      `${environment.baseUrl}` + "/api/images/",
      { images },
      {
        "observe": "body",
        "params": new HttpParams().append(
          "token",
          JSON.parse(localStorage.getItem("user")).token
        ),
      }
    );
  }
}
