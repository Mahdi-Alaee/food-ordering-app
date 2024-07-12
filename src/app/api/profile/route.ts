import { UserModel } from "@/Models/User";
import { UserData } from "@/types/session";
import mongoose from "mongoose";
import { getServerSession } from "next-auth";
import { options } from "../auth/[...nextauth]/options";

export async function PUT(req: Request) {
  const body = await req.json();
  let res;

  mongoose.connect(process.env.MONGO_URL!);
  const user = (await UserModel.findOne({ email: body.email })) as UserData;
  const name = body.newName || user?.name;
  // const image = body.image || user?.image;
  const phone = body.phone || user?.phone;
  const street = body.street || user?.street;
  const postalCode = body.postalCode || user?.postalCode;
  const city = body.city || user?.city;
  const country = body.country || user?.country;
  if (user)
    res = await UserModel.updateOne(
      { email: body.email },
      { name, phone, street, postalCode, city, country }
    );

  return Response.json(res);
}

export async function GET() {
  mongoose.connect(process.env.MONGO_URL!);
  const session = await getServerSession(options);
  console.log({ session });

  if (!session?.user) {
    throw new Error("please signin first!");
  }
  const user = await UserModel.findOne({ email: session.user.email });
  console.log({ user });

  return Response.json(user);
}
