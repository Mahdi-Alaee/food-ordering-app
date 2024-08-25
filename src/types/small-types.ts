import mongoose from "mongoose";

export interface Category {
  _id: string;
  name: string;
}

export interface MenuItem {
  _id?: string;
  name?: string;
  description?: string;
  price?: number;
  image?: string;
  sizes?: MenuItemSizeOrExtra[];
  extras?: MenuItemSizeOrExtra[];
  category?: string;
}

export interface MenuItemSizeOrExtra {
  id: string;
  name: string;
  price: number;
}

export type State =
  | ""
  | "image uploaded"
  | "image upload failed"
  | "image loading"
  | "redirecting";

export interface Cart {
  _id?: string;
  name?: string;
  description?: string;
  price?: number;
  image?: string;
  size?: MenuItemSizeOrExtra;
  extras?: MenuItemSizeOrExtra[];
  count: number;
}

export interface OrderType {
  _id: string;
  email: string;
  phone: string;
  street: string;
  postalCode: string;
  city: string;
  country: string;
  cartProducts: Cart[];
  paid: boolean;
}

export interface IconProps {
  className?: string;
}

export interface AddressFormData {
  newName: string;
  phone: string;
  street: string;
  postalCode: string;
  city: string;
  country: string;
}
