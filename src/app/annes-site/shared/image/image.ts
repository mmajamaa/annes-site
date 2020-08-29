export interface ImageStoreObj extends ImageBaseObj {
  Key: string;
  _id: string;
  so: number;
  gallery: string;
}

export interface ImageUploadObj extends ImageBaseObj {
  image: string;
}

export interface ImageBaseObj {
  alt_fi: string;
  alt_en: string;
}
