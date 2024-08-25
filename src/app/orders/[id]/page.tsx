"use client";

import CartItems from "@/components/medium/CartItems";
import SectionHeader from "@/components/small/SectionHeader";
import { OrderType } from "@/types/small-types";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";

export default function Order() {
  const [subTotal, setSubTotal] = useState<number>();
  const [deliveryFee, setDeliveryFee] = useState<number>(5);
  const [total, setTotal] = useState<number>();
  const { id } = useParams();
  const [order, setOrder] = useState<OrderType>();

  useEffect(() => {
    (async () => {
      console.log({ id });

      const res = await fetch("/api/order?_id=" + id);
      const data = await res.json();
      setOrder(data);

      calcTotal(data);
    })();
  }, []);

  const calcTotal = (orderData: OrderType) => {
    let sum = 0;
    orderData?.cartProducts.forEach((item) => (sum += +item.price!));
    setSubTotal(sum);
    setTotal(sum + deliveryFee)
  };

  return (
    <main className="mb-16">
      {/* title */}
      <div className="mt-4">
        <SectionHeader title="Cart" description="" />
        <h2 className="text-2xl text-center">Thank you for your purchase ❤</h2>
      </div>
      {/* content */}
      <div>
        {order?.cartProducts && (
          <CartItems cart={order?.cartProducts!} noButtons={true} />
        )}
        <p>Sub total: {subTotal}</p>
        <p>Delivery fee: {deliveryFee}</p>
        <p className="text-center text-lg">Total: {total}</p>
      </div>
      <ToastContainer position="top-center" />
    </main>
  );
}
