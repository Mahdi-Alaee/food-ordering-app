import { UserModel } from "@/Models/User";
import mongoose from "mongoose";
import { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";

export const options: AuthOptions = {
  providers: [
    CredentialsProvider({
      credentials: {
        email: { label: "Email", type: "email", placeholder: "email" },
        password: {
          label: "Password",
          type: "password",
          placeholder: "password"
        },
      },
      authorize: async (credentials) => {
        try {
          mongoose.connect(process.env.MONGO_URL!);
          const user = await UserModel.findOne({ email: credentials?.email });

          if (bcrypt.compareSync(credentials?.password!, user.password)) {
            return user;
          }
        } catch (err) {
          console.log(err);

          return null;
        }
      },
    }),
  ],
};
