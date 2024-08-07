import { UserModel } from "@/Models/User";
import mongoose from "mongoose";

export async function GET() {
  mongoose.connect(process.env.MONGO_URL!);
  const users = await UserModel.find();
  return Response.json(users);
}

export async function PUT(req: Request) {
  const url = new URL(req.url);
  const _id = url.searchParams.get("_id");
  const body = await req.json();
  console.log({_id,body});

  mongoose.connect(process.env.MONGO_URL!);
  const res = await UserModel.updateOne({ _id }, body);
  console.log(res);

  return Response.json(res);
}

export async function DELETE(req: Request) {
  const url = new URL(req.url);
  const _id = url.searchParams.get("_id");

  mongoose.connect(process.env.MONGO_URL!);
  const res = await UserModel.deleteOne({ _id });
  console.log(res);

  return Response.json(res);
}
