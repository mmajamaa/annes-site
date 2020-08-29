import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { SubGalleryImportObj, SubGalleryStoreObj } from "./sub-gallery";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";

@Injectable({
  "providedIn": "root",
})
export class SubGalleryService {
  public constructor(private readonly http: HttpClient) {}

  public getSubGalleries(url: string): Observable<SubGalleryImportObj[]> {
    return this.http.get<SubGalleryImportObj[]>(url);
  }

  public postSubGallery(
    fi: string,
    en: string
  ): Observable<SubGalleryStoreObj> {
    return this.http.post<SubGalleryStoreObj>(
      `${environment.baseUrl}/api/galleries`,
      {
        en,
        fi,
      },
      {
        "observe": "body",
        "params": new HttpParams().append(
          "token",
          JSON.parse(localStorage.getItem("user")).token
        ),
      }
    );
  }

  public deleteSubGallery(id: string): Observable<SubGalleryStoreObj> {
    return this.http.delete<SubGalleryStoreObj>(
      `${environment.baseUrl}/api/galleries/${id}`,
      {
        "observe": "body",
        "params": new HttpParams().append(
          "token",
          JSON.parse(localStorage.getItem("user")).token
        ),
      }
    );
  }

  public putSubGalleries(
    subGalleries: SubGalleryImportObj[]
  ): Observable<SubGalleryImportObj[]> {
    return this.http.put<SubGalleryImportObj[]>(
      `${environment.baseUrl}/api/galleries`,
      { subGalleries },
      {
        "observe": "body",
        "params": new HttpParams().append(
          "token",
          JSON.parse(localStorage.getItem("user")).token
        ),
      }
    );
  }

  public publishSubGalleries(): Observable<{ "message": string }> {
    return this.http.post<{ "message": string }>(
      `${environment.baseUrl}/api/galleries/publish`,
      {},
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
