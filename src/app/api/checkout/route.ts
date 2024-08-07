const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

export async function POST(req: Request) {
  const { cart, address } = await req.json();

  console.log({ cart, address });
    const stripeSession = await stripe.checkout
  return Response.json(false);
}
