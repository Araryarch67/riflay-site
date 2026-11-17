import type { ReactNode } from "react";
export type PreviewStyle = { id: string; name: string; src: string };
export type StyleSet = {
  id: string;
  label: string;
  phone?: boolean;
  styles: PreviewStyle[];
};
export type GalleryShot = { src: string; caption: string; phone?: boolean };
export type StoryItem = {
  id: string;
  kicker: string;
  title: string;
  body: ReactNode;
  shot: string;
  alt: string;
};
export type PreviewImage = {
  id: string;
  src: string;
  alt: string;
  width: number;
  height: number;
};
