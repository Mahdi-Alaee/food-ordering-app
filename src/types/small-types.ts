import mongoose from "mongoose";

export interface Category {
  _id: string;
  name: string;
}

export interface MenuItem {
  _id?: string;
  name?: string;
  description?: string;
  price?: string;
  image?: string;
  sizes?: MenuItemSizeOrExtra[];
  extras?: MenuItemSizeOrExtra[];
  category?: string;
}

export interface MenuItemSizeOrExtra {
  id: string;
  name: string;
  price: string;
}

export type State =
  | ""
  | "image uploaded"
  | "image upload failed"
  | "image loading"
  | "redirecting";

export interface Cart extends MenuItem {
  count: number;
}

export interface IconProps {
  className?: string
}
