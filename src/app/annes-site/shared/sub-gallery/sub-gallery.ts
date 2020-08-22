import { Image } from "../image/image";

export interface SubGallery {
  _id?: string;
  en: string;
  fi: string;
  so: number;
  images: any[]; // FIXME
}
