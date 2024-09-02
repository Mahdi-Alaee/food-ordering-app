"use client";

import Loading from "@/app/loading";
import Left from "@/components/icons/Left";
import MenuItemForm from "@/components/medium/MenuItemForm";
import UserTabs from "@/components/medium/UserTabs";
import EditableImage from "@/components/small/EditableImage";
import useProfile from "@/hooks/useProfile";
import { addProduct, deleteProduct } from "@/Redux/reducers/productsReducer";
import { RootState, useAppDispatch } from "@/Redux/store";
import {
  Category,
  MenuItem,
  MenuItemSizeOrExtra,
  State,
} from "@/types/small-types";
import Link from "next/link";
import { redirect, useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";

export default function NewMenuItem() {
  const { isLoading: loadingUser, user } = useProfile();
  const [state, setState] = useState<State>("");
  const [image, setImage] = useState("");
  const [menuItem, setMenuItem] = useState<MenuItem>();
  const router = useRouter();
  const params = useParams();
  const id = params.id[0];
  const dispatch = useAppDispatch();
  const { products, categories } = useSelector((state: RootState) => state);

  useEffect(() => {
    (async () => {
      const mainItem = products.find((item) => item._id === id);
      setMenuItem(mainItem);
      setImage(mainItem?.image || "");
    })();
  }, []);

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

  const onEditMenuItem = async (data: MenuItem) => {
    const body = {
      ...data,
      image,
      _id: id,
    };

    const EditMenuItem = new Promise(async (resolve, reject) => {
      const res = await fetch("/api/menu-item", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      if (res.ok) {
        resolve(res);
        setState("redirecting");
        setTimeout(() => {
          router.push("/menu-items");
        }, 2000);
      } else reject();
    });

    toast.promise(EditMenuItem, {
      pending: "Loading ...",
      success: "Menu item Edited successfully :)",
      error: "An error has occured!",
    });
  };

  const onDeleteThisMenuItem = async () => {
    const deleteThisMenuItem = new Promise(async (resolve, reject) => {
      const res = await fetch("/api/menu-item?_id=" + id, {
        method: "DELETE",
      });
      if (res.ok) {
        resolve(res);
        setState("redirecting");
        const deletedId = await res.json();
        console.log({ deletedId });
        dispatch(deleteProduct(deletedId));
        setTimeout(() => {
          router.push("/menu-items");
        }, 2000);
      } else reject();
    });

    toast.promise(deleteThisMenuItem, {
      pending: "Loading ...",
      success: "Menu-item is deleted successfully",
      error: "An error has occured!",
    });
  };

  if (loadingUser) return <Loading />;
  else if (!user?.isAdmin!) redirect("/");
  else if (!menuItem) redirect("/menu-items");
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
            onSubmit={onEditMenuItem}
            state={state}
            isShowDeleteButton={true}
            onDelete={onDeleteThisMenuItem}
            menuItem={menuItem}
          />
        </div>
      </div>
      <ToastContainer />
    </main>
  );
}
