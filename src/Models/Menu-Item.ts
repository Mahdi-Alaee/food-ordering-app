import mongoose, { model, models, Schema } from "mongoose";

const MenuItemSchema = new Schema(
  {
    name: { type: String, require: true },
    description: { type: String },
    price: { type: String, require: true },
    image: { type: String, require: true },
    sizes: { type: Array },
    extras: { type: Array },
    category: { type: mongoose.Types.ObjectId },
  },
  { timestamps: true }
);

export const MenuItemModel =
  models.MenuItem || model("MenuItem", MenuItemSchema);
