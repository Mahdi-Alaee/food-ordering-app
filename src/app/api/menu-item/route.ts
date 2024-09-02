import { MenuItemModel } from "@/Models/Menu-Item";
import mongoose from "mongoose";
import { isAdmin } from "../auth/[...nextauth]/options";

export async function POST(req: Request) {
  const body = await req.json();

  if (!(await isAdmin())) return Response.json("You are not an admin");

  mongoose.connect(process.env.MONGO_URL!);
  const res = await MenuItemModel.create(body);

  return Response.json(res);
}

export async function GET() {
  mongoose.connect(process.env.MONGO_URL!);
  const data = await MenuItemModel.find();

  return Response.json(data);
}

export async function PUT(req: Request) {
  if (!(await isAdmin())) return Response.json("You are not an admin");

  const { _id, ...otherProps } = await req.json();

  mongoose.connect(process.env.MONGO_URL!);
  const res = await MenuItemModel.updateOne({ _id }, otherProps);

  return Response.json(res);
}

export async function DELETE(req: Request) {
  if (!(await isAdmin())) return Response.json("You are not an admin");

  const url = new URL(req.url);
  const _id = url.searchParams.get("_id");
  mongoose.connect(process.env.MONGO_URL!);
  const res = await MenuItemModel.deleteOne({ _id });
  if (res.acknowledged) return Response.json(_id);
  return Response.json(res);
}
