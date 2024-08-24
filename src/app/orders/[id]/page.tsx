"use client";

import CartItems from "@/components/medium/CartItems";
import SectionHeader from "@/components/small/SectionHeader";
import { AppContextType } from "@/Context/app";
import { Cart } from "@/types/small-types";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";

export default function Order() {
  const [subTotal, setSubTotal] = useState<number>();
  const [deliveryFee, setDeliveryFee] = useState<number>(5);
  const [total, setTotal] = useState<number>();
  const { id } = useParams();
  const [order, setOrder] = useState<Cart>()

  order.

  useEffect(() => {
    (async () => {
      console.log({ id });

      const res = await fetch("/api/order?_id=" + id);
      const data = await res.json();
      console.log({ data });
    })();
  }, []);

  return (
    <main className="mb-16">
      {/* title */}
      <div className="mt-4">
        <SectionHeader title="Cart" description="" />
        <h2 className="text-2xl text-center">Thank you for your purchase ❤</h2>
      </div>
      {/* content */}
      <div>
        {/* <CartItems cart={cart} /> */}
        <p>Sub total: {subTotal}</p>
        <p>Delivery fee: {deliveryFee}</p>
        <p className="text-center text-lg">Total: {total}</p>
      </div>
      <ToastContainer position="top-center" />
    </main>
  );
}
