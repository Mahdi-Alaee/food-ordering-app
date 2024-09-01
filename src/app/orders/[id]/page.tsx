"use client";

import AddressForm from "@/components/medium/AddressForm";
import CartItems from "@/components/medium/CartItems";
import OvalButton from "@/components/small/OvalButton";
import SectionHeader from "@/components/small/SectionHeader";
import useProfile from "@/hooks/useProfile";
import { OrderType } from "@/types/small-types";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { HiHome } from "react-icons/hi";
import { ToastContainer } from "react-toastify";

export default function Order() {
  const [subTotal, setSubTotal] = useState<number>();
  const [deliveryFee, setDeliveryFee] = useState<number>(5);
  const [total, setTotal] = useState<number>();
  const { id } = useParams();
  const [order, setOrder] = useState<OrderType>();
  const { user, isLoading: loadingUser } = useProfile();
  const [loadingOrder,setLoadingOrders] = useState(true);

  useEffect(() => {
    (async () => {
      console.log({ id });

      const res = await fetch("/api/order?_id=" + id);
      const data = await res.json();
      setOrder(data);
      setLoadingOrders(false)
      calcTotal(data);
    })();
  }, []);

  const calcTotal = (orderData: OrderType) => {
    let sum = 0;
    orderData?.cartProducts.forEach((item) => (sum += +item.price!));
    setSubTotal(sum);
    setTotal(sum + deliveryFee);
  };

  if (loadingUser || loadingOrder) return "Loading ....";

  return (
    <main className="mb-16">
      {/* title */}
      <div className="mt-4">
        <SectionHeader title="Cart" description="" />
        <h2 className="text-2xl text-center">Thank you for your purchase ❤</h2>
      </div>
      {/* content */}
      <div className="grid sm:grid-cols-2 gap-4 mt-12">
        {/* left */}
        <div>
          {order?.cartProducts && (
            <CartItems cart={order?.cartProducts!} noButtons={true} />
          )}
          <p>Sub total: {subTotal}</p>
          <p>Delivery fee: {deliveryFee}</p>
          <p className="text-center text-lg">Total: {total}</p>
        </div>
        {/* right */}
        <div className="bg-gray-100 p-4 rounded-xl">
          <AddressForm allDisable user={user!} />
        </div>
      </div>
      <OvalButton
        className="bg-redColor mx-auto w-max mt-6 text-xl flex items-center"
        href="/"
      >
        <HiHome className="text-2xl" />
        Go Home
      </OvalButton>
      <ToastContainer position="top-center" />
    </main>
  );
}
