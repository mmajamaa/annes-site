import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Image } from '../interfaces/image';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ImagesService {

  constructor(private http: HttpClient) { }

  uploadImage(fd: FormData) {
    return this.http.post('/api/image-upload', fd, {
      observe: 'body',
      params: new HttpParams().append('token', localStorage.getItem('token'))
    });
  }

  public getImages(): Observable<Image[]> {
    return this.http.get<Image[]>('/api/images');
  }
  deleteImage(id) {
    return this.http.delete('/api/delete-image/' + id, {
      observe: 'body',
      params: new HttpParams().append('token', localStorage.getItem('token'))
    });
  }
}
