import { OrderModel } from "@/Models/Order";
import { UserData } from "@/types/session";
import { Cart } from "@/types/small-types";
import mongoose from "mongoose";
import { getServerSession } from "next-auth";
// import Stripe from "stripe";
import { options } from "../auth/[...nextauth]/options";
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY!);

export async function POST(req: Request) {
  mongoose.connect(process.env.MONGO_URL!);
  // const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

  const { cart, address, paid } = await req.json();

  const session = await getServerSession(options);
  const user = session?.user as UserData;

  const res = await OrderModel.create({
    email: user.email,
    ...address,
    cartProducts: cart,
    paid: Boolean(paid),
  });
  
  return Response.json(res);
}
