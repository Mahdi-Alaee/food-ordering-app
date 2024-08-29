import { UserModel } from "@/Models/User";
import mongoose from "mongoose";
import { AuthOptions, getServerSession, Session } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import GoogleProvider from "next-auth/providers/google";
import Github from "next-auth/providers/github";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import clientPromise from "@/lib/db";
import { Adapter } from "next-auth/adapters";
import { UserData } from "@/types/session";

export const options: AuthOptions = {
  adapter: MongoDBAdapter(clientPromise) as Adapter,
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "email", type: "email", placeholder: "email" },
        password: {
          label: "password",
          type: "password",
          placeholder: "password",
        },
      },
      authorize: async (credentials) => {
        try {
          console.log({ credentials });

          mongoose.connect(process.env.MONGO_URL!);
          const user = await UserModel.findOne({ email: credentials?.email });

          console.log(
            bcrypt.compareSync(credentials?.password!, user.password)
          );

          if (bcrypt.compareSync(credentials?.password!, user.password)) {
            console.log({ user });
            console.log("logged in!");

            return user;
          }
          return null;
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
      profile(profile, tokens) {
        return {
          id: profile.id,
          name: profile.name,
          email: profile.email,
          image: profile.image,
          phone: profile.phone,
          street: profile.street,
          postalCode: profile.postalCode,
          city: profile.city,
          country: profile.country,
          isAdmin: Boolean(profile.isAdmin),
        };
      },
    }),
  ],
  debug: true,
  pages: {
    signIn: "/login",
    signOut: "/logout",
  },
};

export async function isAdmin() {
  const session = await getServerSession(options);
  if (!session) {
    return false;
  }
  mongoose.connect(process.env.MONGO_URL!);
  const user = (await UserModel.findOne({
    email: session.user?.email,
  })) as UserData;

  return Boolean(user?.isAdmin);
}
