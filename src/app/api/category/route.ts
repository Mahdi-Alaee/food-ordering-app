import { CategoryModel } from "@/Models/Category";
import mongoose from "mongoose";
import { isAdmin } from "../auth/[...nextauth]/options";

export async function POST(req: Request) {
  if (!(await isAdmin())) return Response.json("You are not an admin");

  const body = await req.json();
  mongoose.connect(process.env.MONGO_URL!);
  const res = await CategoryModel.create(body);

  if (!res) {
    throw new Error("Errrrooooorrr!");
  }

  return Response.json(res);
}

export async function PUT(req: Request) {
  if (!(await isAdmin())) return Response.json("You are not an admin");

  const { _id, name } = await req.json();
  mongoose.connect(process.env.MONGO_URL!);

  const res = await CategoryModel.updateOne({ _id }, { name });

  if (!res) {
    throw new Error("Errrrooooorrr!");
  }

  return Response.json(res);
}

export async function GET() {
  mongoose.connect(process.env.MONGO_URL!);
  const res = await CategoryModel.find();

  return Response.json(res);
}

export async function DELETE(req: Request) {
  if (!(await isAdmin())) return Response.json("You are not an admin");

  const url = new URL(req.url);
  const _id = url.searchParams.get("_id");
  mongoose.connect(process.env.MONGO_URL!);
  const res = await CategoryModel.deleteOne({ _id });

  if (res.acknowledged) return Response.json(_id);

  return Response.json(res);
}
