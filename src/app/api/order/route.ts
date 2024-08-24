import { getServerSession } from "next-auth";
import { isAdmin, options } from "../auth/[...nextauth]/options";
import mongoose from "mongoose";
import { OrderModel } from "@/Models/Order";

export async function GET(req: Request) {
  const admin = await isAdmin();

  const url = new URL(req.url);

  const orderId = url.searchParams.get("_id");

  mongoose.connect(process.env.MONGO_URL!);

  if (Boolean(orderId)) {
    const orderData = await OrderModel.findById(orderId);
    return Response.json(orderData);
  } else if (admin) {
    const orders = await OrderModel.find();
    return Response.json(orders);
  } else {
    throw new Error("you must be either admin or pass the orderId");
  }
}
