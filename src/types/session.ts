import { ISODateString } from "next-auth"

export interface SessionData {
    user?: {
        name?: string | null
        email?: string | null
        image?: string | null
        phone?: string | null
        street?: string | null
        postalCode?: string | null
        city?: string | null
        country?: string | null
      }
      expires: ISODateString
}