"use client";

import SectionHeader from "@/components/small/SectionHeader";
import CartItems from "./components/CartItems";
import { useContext, useEffect, useState } from "react";
import { AppContext, AppContextType } from "@/Context/app";
import OvalButton from "@/components/small/OvalButton";
import useProfile from "@/hooks/useProfile";
import { toast, ToastContainer } from "react-toastify";
import { useRouter } from "next/navigation";
import { UserData } from "@/types/session";

export default function Cart() {
  const { cart } = useContext(AppContext) as AppContextType;
  const [subTotal, setSubTotal] = useState<number>();
  const [deliveryFee, setDeliveryFee] = useState<number>(5);
  const [total, setTotal] = useState<number>();
  const { user } = useProfile();
  const router = useRouter();

  useEffect(() => {
    calcSubTotal();
  }, [cart]);

  const calcSubTotal = () => {
    let sum = 0;
    cart.forEach((item) => {
      sum += +item.price! * +item.count;
    });

    setSubTotal(sum);
    setTotal(sum + deliveryFee);
  };

  return (
    <main className="mb-16">
      {/* title */}
      <div className="mt-4">
        <SectionHeader title="Cart" description=""></SectionHeader>
      </div>
      {/* content */}
      <div>
        <CartItems cart={cart} />
        <p>Sub total: {subTotal}</p>
        <p>Delivery fee: {deliveryFee}</p>
        <p className="text-center text-lg">Total: {total}</p>
        <OvalButton
          onClick={async () => {
            const { phone, city, country, postalCode, street } =
              user as UserData;
            if (phone && city && country && postalCode && street) {
              console.log({
                cart,
                address: { phone, city, country, postalCode, street },
              });

              const res = await fetch("/api/checkout", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  cart,
                  address: { phone, city, country, postalCode, street },
                }),
              });
              console.log({ res, data: await res.json() });
            } else {
              toast.info("Complete your profile info (address)");
              setTimeout(() => {
                router.push("/profile");
              }, 3000);
            }
          }}
          type="button"
          className="bg-redColor mx-auto mt-12 scale-150"
        >
          Continue to pay
        </OvalButton>
      </div>
      <ToastContainer position="top-center" />
    </main>
  );
}
