import { ISODateString } from "next-auth";

export interface SessionData {
  user?: UserData;
  expires: ISODateString;
}

export interface UserData {
  _id?: string | null;
  name?: string | null;
  email?: string | null;
  image?: string | null;
  phone?: string | null;
  street?: string | null;
  postalCode?: string | null;
  city?: string | null;
  country?: string | null;
  isAdmin?: boolean;
}
