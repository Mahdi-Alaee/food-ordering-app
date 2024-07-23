"use client";
import Left from "@/components/icons/Left";
import MenuItemForm from "@/components/medium/MenuItemForm";
import UserTabs from "@/components/medium/UserTabs";
import ImageUploader from "@/components/small/ImageUploader";
import useProfile from "@/hooks/useProfile";
import { Category, MenuItem, MenuItemSizeOrExtra } from "@/types/small-types";
import Image from "next/image";
import Link from "next/link";
import { redirect, useParams, useRouter } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";

export default function NewMenuItem() {
  const { isLoading, user } = useProfile();
  const [state, setState] = useState<
    | ""
    | "image uploaded"
    | "image upload failed"
    | "image loading"
    | "redirecting"
  >("");
  const [image, setImage] = useState("");
  const [menuItem, setMenuItem] = useState<MenuItem>();
  const router = useRouter();
  const params = useParams();
  const id = params.id[0];
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    (async () => {
      const res = await fetch("/api/menu-item");
      if (res.ok) {
        const data = (await res.json()) as MenuItem[];
        const mainItem = data.find((item) => item._id === id);
        setMenuItem(mainItem);
        setImage(mainItem?.image || "");
      }
    })();

    (async () => {
      const res = await fetch("/api/category");
      if (res.ok) {
        const data = await res.json();
        setCategories(data);
      }
    })();
  }, []);

  useEffect(() => {
    if (state !== "") {
      state === "image loading"
        ? toast.info("Loading ...")
        : state === "image uploaded"
        ? toast.success("Your profile photo changed successfully")
        : state === "image upload failed"
        ? toast.error("an error occured!")
        : null;
      setTimeout(() => {
        setState("");
      }, 2000);
    }
  }, [state]);

  const onEditMenuItem = async (data: MenuItem) => {
    const body = {
      ...data,
      image: menuItem?.image,
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
      error: "An error occured!",
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
        setTimeout(() => {
          router.push("/menu-items");
        }, 2000);
      } else reject();
    });

    toast.promise(deleteThisMenuItem, {
      pending: "Loading ...",
      success: "Menu-item is deleted successfully",
      error: "An error occured!",
    });
  };

  if (isLoading) return "Loading ...";
  else if (!user?.isAdmin!) redirect("/");
  else if (!menuItem) redirect("/menu-items");
  return (
    <main className="mb-16">
      <UserTabs isAdmin={user?.isAdmin!} />

      {/* content */}
      <div className="max-w-md mx-auto">
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
            <div>
              {/* profile photo */}
              {image ? (
                <Image
                  src={image}
                  alt="person profile image"
                  width="10000"
                  height="10000"
                  className="w-32 object-contain rounded-xl mb-2"
                  priority={true}
                />
              ) : (
                <span className="bg-gray-200 py-5 flex justify-center text-nowrap rounded-md text-sm w-28">
                  No Image
                </span>
              )}
              {/* edit profile photo */}
              <ImageUploader
                state={state}
                setState={setState}
                email={user?.email!}
                setImage={setImage}
              >
                Add
              </ImageUploader>
            </div>
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
