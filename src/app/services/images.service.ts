import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ImagesService {

  constructor(private http: HttpClient) { }

  uploadImage(fd: FormData) {
    return this.http.post('/image-upload', fd);
  }

  getImages() {
    return this.http.get('/api/images');
  }
}
