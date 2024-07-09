import { UserModel } from "@/Models/User";
import mongoose from "mongoose";
import { User } from "next-auth";

export async function PUT(req: Request) {
  const { email, newName, image } = await req.json();
  let res;

  mongoose.connect(process.env.MONGO_URL!);
  const user = (await UserModel.findOne({ email })) as User;
  const name = newName || user.name;

  if (user)
    res = await UserModel.updateOne({ email }, { name, image });
  console.log({ res });

  return Response.json(res);
}
