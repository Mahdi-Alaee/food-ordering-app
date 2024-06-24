import { User } from "@/Context/app";
import { UserModel } from "@/Models/User";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";

export async function GET(req: Response) {
  const session = req.headers.get("Authorization")?.split(" ")[1];

  if (!session)
    return Response.json({
      errorCode: "NO_SESSION",
      message: 'you must pass the session in "Authorization" header',
      user: null,
    });

  const { _id } = jwt.verify(session, process.env.JWT_SECRET!) as User;

  try {
    mongoose.connect(process.env.MONGO_URL!);
    const user = await UserModel.findOne({ _id });

    return Response.json({
      errorCode: null,
      message: null,
      user,
    });
  } catch (err) {
    console.log(err);
    return Response.json({
      errorCode: "UNAUTHORIZED",
      message: "the session isn't valid",
      user: null,
    });
  }
}
