"use client";

import UserTabs from "@/components/medium/UserTabs";
import ImageUploader from "@/components/small/ImageUploader";
import TextBox from "@/components/small/TextBox";
import useProfile from "@/hooks/useProfile";
import Image from "next/image";
import { redirect } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";

export default function Profile() {
  const [newName, setNewName] = useState("");
  const [state, setState] = useState<
    "image uploaded" | "image upload failed" | "image loading" | ""
  >("");
  const [userImage, setUserImage] = useState("");
  const [phone, setPhone] = useState("");
  const [street, setStreet] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");

  const { isLoading, user } = useProfile();

  useEffect(() => {
    setNewName(user?.name || "");
    setUserImage(user?.image || "");
    setPhone(user?.phone || "");
    setStreet(user?.street || "");
    setPostalCode(user?.postalCode || "");
    setCity(user?.city || "");
    setCountry(user?.country || "");
  }, [user]);

  useEffect(() => {
    if (state !== "") {
      state === "image loading"
        ? toast.info("Loading ...")
        : state === "image uploaded"
        ? toast.success("Your profile photo changed successfully")
        : toast.error("an error occured!");
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
          image: userImage
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
      <div className="max-w-md mx-auto flex gap-x-6">
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
            email={user?.email!}
            setImage={setUserImage}
          />
        </div>
        {/* right */}
        <form className="flex flex-col w-full gap-y-2" onSubmit={onEditProfile}>
          {/* first and last name */}
          <TextBox
            label="first name and last name:"
            placeholder="Enter your First and last name ..."
            onChange={(e) => setNewName(e.target.value)}
            value={newName}
          />
          {/* email */}
          <TextBox
            label="Email:"
            placeholder="Enter your email ..."
            value={user?.email!}
            disabled
          />
          {/* phone */}
          <TextBox
            label="Phone:"
            placeholder="Enter your phone number ..."
            onChange={(e) => setPhone(e.target.value)}
            value={phone}
          />
          {/* street */}
          <TextBox
            label="Street address:"
            onChange={(e) => setStreet(e.target.value)}
            placeholder="Enter your street address ..."
            value={street}
          />
          <div className="grid grid-cols-2 gap-x-4">
            {/* postal code */}
            <TextBox
              label="Postal code:"
              onChange={(e) => setPostalCode(e.target.value)}
              placeholder="Enter postal code ..."
              value={postalCode}
            />

            {/* city */}
            <TextBox
              label="City:"
              onChange={(e) => setCity(e.target.value)}
              placeholder="Enter your city ..."
              value={city}
            />
          </div>
          {/* country */}
          <TextBox
            label="Country:"
            onChange={(e) => setCountry(e.target.value)}
            placeholder="Enter your country..."
            value={country}
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
      <ToastContainer />
    </main>
  );
}
