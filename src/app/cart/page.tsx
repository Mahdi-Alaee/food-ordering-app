"use client";

import SectionHeader from "@/components/small/SectionHeader";
import CartItems from "./components/CartItems";
import { useContext, useEffect, useState } from "react";
import { AppContext, AppContextType } from "@/Context/app";
import OvalButton from "@/components/small/OvalButton";
import useProfile from "@/hooks/useProfile";
import { toast, ToastContainer } from "react-toastify";
import { useRouter } from "next/navigation";

export default function Cart() {
  const { cart } = useContext(AppContext) as AppContextType;
  const [subTotal, setSubTotal] = useState<number>();
  const { user } = useProfile();
  const router = useRouter();

  useEffect(() => {
    calcSubTotal();
  }, [cart]);

  const calcSubTotal = () => {
    let sum = 0;
    cart.forEach((item) => {
      sum += +item.price!;
    });

    setSubTotal(sum);
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

        <OvalButton
          onClick={() => {
            if (
              user?.phone &&
              user.city &&
              user.country &&
              user.postalCode &&
              user.street
            ) {
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
          Pay ${subTotal}
        </OvalButton>
      </div>
      <ToastContainer position="top-center"  />
    </main>
  );
}
