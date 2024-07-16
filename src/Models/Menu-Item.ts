import { model, models, Schema } from "mongoose";

const MenuItemSchema = new Schema(
  {
    name: { type: String, require: true },
    desription: { type: String },
    price: { type: String, require: true },
    image: { type: String, require: true },
  },
  { timestamps: true }
);

export const MenuItemModel =
  models.MenuItem || model("MenuItem", MenuItemSchema);
