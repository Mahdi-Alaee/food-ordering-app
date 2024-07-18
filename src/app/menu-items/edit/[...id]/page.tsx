"use client";
import Left from "@/components/icons/Left";
import Right from "@/components/icons/Right";
import UserTabs from "@/components/medium/UserTabs";
import ImageUploader from "@/components/small/ImageUploader";
import TextBox from "@/components/small/TextBox";
import useProfile from "@/hooks/useProfile";
import { MenuItem } from "@/types/small-types";
import Image from "next/image";
import Link from "next/link";
import { redirect, useParams, useRouter } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";

export default function NewMenuItem() {
  const { isLoading, user } = useProfile();
  const [state, setState] = useState<
    "" | "image uploaded" | "image upload failed" | "image loading"
  >("");
  const [image, setImage] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [menuItem, setMenuItem] = useState<MenuItem>();
  const router = useRouter();
  const params = useParams();
  const id = params.id[0];

  useEffect(() => {
    (async () => {
      const res = await fetch("/api/menu-item");
      if (res.ok) {
        const data = (await res.json()) as MenuItem[];

        const mainItem = data.find((item) => item._id === id);

        setName(mainItem?.name || "");
        setDescription(mainItem?.description || "");
        setPrice(mainItem?.price || "");
        setImage(mainItem?.image || "");
        setMenuItem(mainItem);
      }
    })();
  }, []);

  useEffect(() => {
    console.log(state);

    if (state !== "") {
      state === "image loading"
        ? toast.info("Loading ...")
        : state === "image uploaded"
        ? toast.success("Your profile photo changed successfully")
        : toast.error("an error is occured!");
      setTimeout(() => {
        setState("");
      }, 2000);
    }
  }, [state]);

  const onCreateMenuItem = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = {
      _id:id,
      name,
      description,
      price,
      image,
    };

    const CreateMenuItem = new Promise(async (resolve, reject) => {
      const res = await fetch("/api/menu-item", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        resolve(res);
        setTimeout(() => {
          router.push("/menu-items");
        }, 2000);
      } else reject();
    });

    toast.promise(CreateMenuItem, {
      pending: "Loading ...",
      success: "Menu item Edited successfully :)",
      error: "An error is occured!",
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
          {/* right */}
          <form
            className="flex flex-col w-full gap-y-2"
            onSubmit={onCreateMenuItem}
          >
            {/* item name */}
            <TextBox
              label="Name:"
              placeholder="Enter item's First and last name ..."
              onChange={(e) => setName(e.target.value)}
              value={name}
            />
            {/* description */}
            <TextBox
              label="Description:"
              placeholder="Enter item's description ..."
              onChange={(e) => setDescription(e.target.value)}
              value={description}
            />
            {/* price */}
            <TextBox
              label="Price:"
              placeholder="Enter item's price number ..."
              onChange={(e) => setPrice(e.target.value)}
              value={price}
            />

            {/* submit */}
            <button
              className="p-2 rounded-xl bg-redColor text-white disabled:opacity-70"
              type="submit"
              disabled={state !== ""}
            >
              Save
            </button>
          </form>
        </div>
      </div>
      <ToastContainer />
    </main>
  );
}
