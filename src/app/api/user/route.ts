import { UserModel } from "@/Models/User";
import mongoose from "mongoose";

export async function GET() {
  mongoose.connect(process.env.MONGO_URL!);
  const users = await UserModel.find();
  return Response.json(users);
}
