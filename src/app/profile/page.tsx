"use client";

import AddressForm from "@/components/medium/AddressForm";
import UserTabs from "@/components/medium/UserTabs";
import ImageUploader from "@/components/small/ImageUploader";
import TextBox from "@/components/small/TextBox";
import useProfile from "@/hooks/useProfile";
import { AddressFormData } from "@/types/small-types";
import Image from "next/image";
import { redirect } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";

export default function Profile() {
  const [state, setState] = useState<
    | "image uploaded"
    | "image upload failed"
    | "image loading"
    | "redirecting"
    | ""
  >("");
  const [userImage, setUserImage] = useState("");
  const [formData, setFormData] = useState<AddressFormData>();
  const { isLoading, user } = useProfile();

  useEffect(() => {
    setUserImage(user?.image || "");
  }, [user]);

  useEffect(() => {
    if (state !== "") {
      state === "image loading"
        ? toast.info("Loading ...")
        : state === "image uploaded"
        ? toast.success("Your profile photo changed successfully")
        : toast.error("An error has occured!");
      setTimeout(() => {
        setState("");
      }, 2000);
    }
  }, [state]);

  if (isLoading) {
    return "Loading ...";
  } else if (user === null) {
    redirect("/login");
  }

  const onEditProfile = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { newName, phone, street, postalCode, city, country } = formData!;

    toast.promise(
      fetch("/api/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: user?.email,
          newName,
          phone,
          street,
          postalCode,
          city,
          country,
          image: userImage,
          isAdmin: Boolean(user.isAdmin),
        }),
      }),
      {
        pending: "Loading...",
        success: "your profile updated successfully",
        error: "Error!",
      },
      { position: "top-center" }
    );
  };
  return (
    <main className="mb-16">
      {/* user tabs */}
      <UserTabs isAdmin={user?.isAdmin!} />
      {/* content */}
      <div className="max-w-xl mx-auto flex gap-x-6">
        {/* left */}
        <div className="max-w-2/6">
          {userImage ? (
            //   {/* profile photo */}
            <Image
              src={userImage}
              alt="person profile image"
              width="10000"
              height="10000"
              className="w-32 object-contain rounded-xl mb-2"
              priority={true}
            />
          ) : (
            <Image
              src="/images/person.png"
              alt="person profile image"
              width="10000"
              height="10000"
              className="w-32 object-contain rounded-xl mb-2"
              priority={true}
            />
          )}
          {/* edit profile photo */}
          <ImageUploader
            state={state}
            setState={setState}
            setImage={setUserImage}
          />
        </div>
        {/* right */}
        <AddressForm
          formData={formData!}
          onEditProfile={onEditProfile}
          setFormData={setFormData}
          state={state}
          user={user}
        />
      </div>
      <ToastContainer />
    </main>
  );
}
