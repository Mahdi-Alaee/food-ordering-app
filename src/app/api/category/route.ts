import { CategoryModel } from "@/Models/Category";
import mongoose from "mongoose";

export async function POST(req: Request) {
  const body = await req.json();
  mongoose.connect(process.env.MONGO_URL!);
  const res = await CategoryModel.create(body);

  if (!res) {
    throw new Error("Errrrooooorrr!");
  }

  return Response.json(res);
}

export async function PUT(req: Request) {
  const { _id, name } = await req.json();
  mongoose.connect(process.env.MONGO_URL!);
  console.log({name});
  
  const res = await CategoryModel.updateOne({ _id }, { name });
  console.log({ res });

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
