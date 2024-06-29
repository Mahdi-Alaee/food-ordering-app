import { UserModel } from "@/Models/User";
import mongoose from "mongoose";

export async function POST(req: Request) {
  const body = await req.json();
  mongoose.connect(process.env.MONGO_URL!);
  const createdUser = await UserModel.create(body);
  console.log("createdUser: ", createdUser);
  return Response.json(createdUser);
}
