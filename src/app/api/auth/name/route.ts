import { UserModel } from "@/Models/User";
import mongoose from "mongoose";

export async function PUT(req: Request) {
  const { email, newName } = await req.json();

  let res;

  mongoose.connect(process.env.MONGO_URL!);

  if (email && newName)
    res = await UserModel.updateOne({ email }, { name: newName });

  console.log({ res });

  return Response.json(res);
}