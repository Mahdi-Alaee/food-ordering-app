import { UserModel } from "@/Models/User";
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export async function POST(req: Request) {
  const { email, password } = (await req.json()) as {
    email: string;
    password: string;
  };

  let message = "";
  let user = null;
  let token = "";

  mongoose.connect(process.env.MONGO_URL!);
  const findedUser = await UserModel.findOne({
    email,
  });
  if (findedUser) {
    const ok = bcrypt.compareSync(password, findedUser.password);
    if (ok) {
      user = findedUser;
      const { _id, email, password } = findedUser;
      token = jwt.sign({ _id, email, password }, process.env.JWT_SECRET!);
    } else message = "password isn't valid";
  } else {
    message = "email isn't valid";
  }

  return Response.json({ message, user, token });
}
