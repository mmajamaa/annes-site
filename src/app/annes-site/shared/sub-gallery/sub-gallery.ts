import { ImageStoreObj } from "../image/image";

export interface SubGalleryBaseObj {
  _id?: string;
  en: string;
  fi: string;
  so: number;
}

export interface SubGalleryImportObj extends SubGalleryBaseObj {
  images: ImageStoreObj[];
}

export interface SubGalleryStoreObj extends SubGalleryBaseObj {
  images: string[];
}

export interface SubGalleryChanges {
  "id": string;
  "changes": { "so"?: number; "images"?: string[] };
}
