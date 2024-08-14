import { getServerSession } from "next-auth";
import { isAdmin, options } from "../auth/[...nextauth]/options";

export async function GET(req:Request){
    const admin = await isAdmin()
    
    const url = new URL(req.url)

    return Response.json(true);
}