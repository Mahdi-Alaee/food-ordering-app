"use client";

import SectionHeader from "@/components/small/SectionHeader";
import CartItems from "@/components/medium/CartItems";
import { useContext, useEffect, useState } from "react";
import { AppContext, AppContextType } from "@/Context/app";
import OvalButton from "@/components/small/OvalButton";
import useProfile from "@/hooks/useProfile";
import { toast, ToastContainer } from "react-toastify";
import { redirect, useRouter } from "next/navigation";
import { UserData } from "@/types/session";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";
import { Cart } from "@/types/small-types";

export default function CartPage() {
  const { cart, resetCart } = useContext(AppContext) as AppContextType;
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

  const handleSubmit = async () => {
    if (!user) {
      router.push("/login");
      return false;
    }

    if(cart.length < 1){
      toast.info('Your basket is empty!')
      return false
    }

    const { phone, city, country, postalCode, street } = user as UserData;
    if (phone && city && country && postalCode && street) {
      const dialogResult = await withReactContent(Swal).fire({
        title: "Would you like to pay?",
        confirmButtonText: "Yes",
        denyButtonText: "No!",
        showDenyButton: true,
        showCancelButton: true,
        cancelButtonText: "cancel",
        showCloseButton: true,
      });

      if (dialogResult.isDismissed) return false;

      const Checkout = new Promise(async (resolve, reject) => {
        const res = await fetch("/api/checkout", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            cart,
            address: { phone, city, country, postalCode, street },
            paid: Boolean(dialogResult?.value),
          }),
        });
        if (res.ok) {
          resolve(res);
          const data = (await res.json()) as Cart;
          setTimeout(() => {
            resetCart();
            router.push("/orders/" + data._id);
          }, 2000);
        } else {
          reject();
        }
      });
      toast.promise(Checkout, {
        success: "redirecting ...",
        pending: "loading ...",
        error: "An error has occured!",
      });
    } else {
      toast.info("Complete your profile info (address)");
      setTimeout(() => {
        router.push("/profile");
      }, 3000);
    }
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
          onClick={handleSubmit}
          type="button"
          className="bg-redColor mx-auto mt-12 scale-150"
        >
          Submit
        </OvalButton>
      </div>
      <ToastContainer position="top-center" />
    </main>
  );
}
