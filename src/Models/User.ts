import { Schema, model, models } from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new Schema(
  {
    email: { type: String, unique: true, require: true },
    password: {
      type: String,
      require: true,
      // min: [8, "password must be greater than 7 caracters"],
      validate: {
        validator: (value: string) => value.length > 7,
        message: "password must be greater than 7 caracters",
      },
    },
  },
  { timestamps: true }
);
userSchema.post("validate", async (user) => {
  user.password = await bcrypt.hash(user.password!, 10);
});

export const UserModel = models?.User || model("User", userSchema);
