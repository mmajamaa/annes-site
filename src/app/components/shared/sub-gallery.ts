import { Image } from "./image";

export interface SubGallery {
  _id?: string;
  en: string;
  fi: string;
  so: number;
  images: any[]; // FIXME
}
