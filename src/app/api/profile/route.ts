import { UserModel } from "@/Models/User";
import { UserData } from "@/types/session";
import mongoose from "mongoose";
import { getServerSession } from "next-auth";
import { options } from "../auth/[...nextauth]/options";

export async function PUT(req: Request) {
  const body = await req.json();
  let res;
  const { newName, phone, street, postalCode, city, country } = body;

  mongoose.connect(process.env.MONGO_URL!);
  const user = (await UserModel.findOne({ email: body.email })) as UserData;
  // const name = body.newName;
  // const phone = body.phone;
  // const street = body.street;
  // const postalCode = body.postalCode;
  // const city = body.city;
  // const country = body.country;
  const image = body.image || user?.image;
  if (user)
    res = await UserModel.updateOne(
      { email: body.email },
      {
        name: newName,
        phone,
        street,
        postalCode,
        city,
        country,
        image,
        isAdmin: user.isAdmin,
      }
    );

  return Response.json(res);
}

export async function GET() {
  mongoose.connect(process.env.MONGO_URL!);
  const session = await getServerSession(options);

  if (!session?.user) {
    throw new Error("please signin first!");
  }
  const user = await UserModel.findOne({ email: session.user.email });

  return Response.json(user);
}
