import { UserModel } from "@/Models/User";
import mongoose from "mongoose";
import { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import GoogleProvider from "next-auth/providers/google";
import Github from "next-auth/providers/github";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import clientPromise from "@/lib/db";
import { Adapter } from "next-auth/adapters";

export const options: AuthOptions = {
  adapter: MongoDBAdapter(clientPromise) as Adapter,
  providers: [
    CredentialsProvider({
      credentials: {
        email: { label: "Email", type: "email", placeholder: "email" },
        password: {
          label: "Password",
          type: "password",
          placeholder: "password",
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
    GoogleProvider({
      clientId: process.env.GOOGLE_ID!,
      clientSecret: process.env.GOOGLE_SECRET!,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
    Github({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
  ],
  debug: true,
};
