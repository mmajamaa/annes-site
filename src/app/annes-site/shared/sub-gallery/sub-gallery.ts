import { ImageStoreObj } from "../image/image";

export interface SubGalleryImportObj extends SubGalleryBaseObj {
  images: ImageStoreObj[];
}

export interface SubGalleryStoreObj extends SubGalleryBaseObj {
  images: string[];
}

export interface SubGalleryBaseObj {
  _id?: string;
  en: string;
  fi: string;
  so: number;
}
