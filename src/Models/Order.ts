import { model, models, Schema } from "mongoose";

const OrderSchema = new Schema({
  email: { type: String },
  phone: { type: String },
  street: { type: String },
  postalCode: { type: String },
  city: { type: String },
  country: { type: String },
  cartProducts: { type: Array },
  paid: { type: Boolean, default: false },
});

export const OrderModel = models?.Order || model("Order",OrderSchema);
