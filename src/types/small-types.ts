export interface Category {
  _id: string;
  name: string;
}

export interface MenuItem {
  _id: string;
  name: string;
  description: string;
  price: string;
  image: string;
  sizes: MenuItemSizeOrExtra[];
  extras: MenuItemSizeOrExtra[];
}

export interface MenuItemSizeOrExtra {
  id: string;
  name: string;
  price: string;
}
