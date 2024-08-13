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
  console.log(process.env.STRIPE_SECRET_KEY);

  // const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

  const { cart, address } = await req.json();

  const session = await getServerSession(options);
  const user = session?.user as UserData;

  const res = await OrderModel.create({
    email: user.email,
    ...address,
    cartProducts: cart,
    paid: false,
  });

  console.log({ res });

  const line_items =
    // : Stripe.Checkout.SessionCreateParams.LineItem[]
    [];

  for (const product of cart as Cart[]) {
    line_items.push({
      quantity: +product.count,
      price_data: {
        currency: "USD",
        product_data: {
          name: product.name!,
          images: [product.image!],
          metadata: { productId: product._id! },
        },
        unit_amount: product.price,
      },
    });
  }
  console.log({ line_items });

  const stripeSession = await stripe.checkout.sessions.create(
    {
      line_items,
      mode: "payment",
      customer_email: user.email!,
      success_url: process.env.URL + "cart?success=1",
      cancel_url: process.env.URL + "cart?fail=1",
      metadata: { orderId: null },
      shipping_options: [
        {
          shipping_rate_data: {
            display_name: "delivery fee",
            type: "fixed_amount",
            fixed_amount: { amount: 500, currency: "USD" },
          },
        },
      ],
    }
    // {stripeAccount:process.env.STRIPE_SECRET_KEY}
  );
  return Response.json(stripeSession.url);
}
