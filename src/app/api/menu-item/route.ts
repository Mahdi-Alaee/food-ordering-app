import { MenuItemModel } from "@/Models/Menu-Item";
import mongoose from "mongoose";

export async function POST(req: Request) {
  const body = await req.json();

  mongoose.connect(process.env.MONGO_URL!);
  const res = await MenuItemModel.create(body);

  return Response.json(res);
}
