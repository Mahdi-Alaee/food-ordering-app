"use client";
import Loading from "@/app/loading";
import Left from "@/components/icons/Left";
import MenuItemForm from "@/components/medium/MenuItemForm";
import UserTabs from "@/components/medium/UserTabs";
import EditableImage from "@/components/small/EditableImage";
import useProfile from "@/hooks/useProfile";
import { addProduct } from "@/Redux/reducers/productsReducer";
import { RootState, useAppDispatch } from "@/Redux/store";
import { MenuItem, State } from "@/types/small-types";
import Link from "next/link";
import { redirect, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";

export default function NewMenuItem() {
  const { isLoading: loadingUser, user } = useProfile();
  const [state, setState] = useState<State>("");
  const [image, setImage] = useState("");
  const dispatch = useAppDispatch();
  const { categories } = useSelector((state: RootState) => state);

  const router = useRouter();

  useEffect(() => {
    if (state !== "") {
      state === "image loading"
        ? toast.info("Loading ...")
        : state === "image uploaded"
        ? toast.success("Your profile photo changed successfully")
        : state === "image upload failed"
        ? toast.error("An error has occured!")
        : null;
      setTimeout(() => {
        setState("");
      }, 2000);
    }
  }, [state]);

  const onCreateMenuItem = async (data: MenuItem) => {
    const body = { ...data, image };

    const CreateMenuItem = new Promise(async (resolve, reject) => {
      const res = await fetch("/api/menu-item", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      if (res.ok) {
        resolve(res);
        setState("redirecting");
        const newMenuItem = await res.json();
        console.log({ newMenuItem });
        dispatch(addProduct(newMenuItem));
        setTimeout(() => {
          router.push("/menu-items");
        }, 2000);
      } else reject();
    });

    toast.promise(CreateMenuItem, {
      pending: "Loading ...",
      success: "Menu item created successfully :)",
      error: "An error has occured!",
    });
  };

  if (loadingUser) return <Loading />;
  else if (!user?.isAdmin!) redirect("/");
  return (
    <main className="mb-16">
      <UserTabs isAdmin={user?.isAdmin!} />

      {/* content */}
      <div className="max-w-xl mx-auto">
        {/* the link of menu items page */}
        <Link
          className="rounded-lg text-black font-bold border flex justify-center gap-x-2 py-2 mb-8"
          href="/menu-items"
        >
          <Left /> Show menu item list
        </Link>
        <div className=" flex gap-x-6">
          {/* left */}
          <div className="max-w-2/6">
            <EditableImage
              image={image}
              setImage={setImage}
              state={state}
              setState={setState}
            />
          </div>
          {/* right */}
          <MenuItemForm
            categories={categories}
            onSubmit={onCreateMenuItem}
            state={state}
          />
        </div>
      </div>
      <ToastContainer />
    </main>
  );
}
