"use client";

import UserTabs from "@/components/medium/UserTabs";
import ImageUploader from "@/components/small/ImageUploader";
import TextBox from "@/components/small/TextBox";
import useProfile from "@/hooks/useProfile";
import { UserData } from "@/types/session";
import Image from "next/image";
import { redirect, useParams } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";

export default function Profile() {
  const [newName, setNewName] = useState("");
  const [state, setState] = useState<
    | "image uploaded"
    | "image upload failed"
    | "image loading"
    | "redirecting"
    | ""
  >("");
  const [userImage, setUserImage] = useState("");
  const [phone, setPhone] = useState("");
  const [street, setStreet] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [admin, setAdmin] = useState(false);
  const [email, setEmail] = useState("");

  const { _id } = useParams();
  const { isLoading, user } = useProfile();

  useEffect(() => {
    (async () => {
      let mainUser;
      const res = await fetch("/api/user");
      if (res.ok) {
        const users = (await res.json()) as UserData[];
        mainUser = users.find((user) => user._id === _id);
      }
      console.log({mainUser});
      
      setNewName(mainUser?.name || "");
      setUserImage(mainUser?.image || "");
      setPhone(mainUser?.phone || "");
      setStreet(mainUser?.street || "");
      setPostalCode(mainUser?.postalCode || "");
      setCity(mainUser?.city || "");
      setCountry(mainUser?.country || "");
      setAdmin(mainUser?.isAdmin || false);
      setEmail(mainUser?.email || "");
    })();
  }, []);

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
    toast.promise(
      fetch("/api/user?_id=" + _id, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          name: newName,
          phone,
          street,
          postalCode,
          city,
          country,
          image: userImage,
          isAdmin: admin,
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
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
          {/* admin */}
          <label className="flex gap-x-2 cursor-pointer">
            <span>admin:</span>
            <input
              checked={admin}
              onChange={(e) => setAdmin(e.target.checked)}
              name="admin"
              type="checkbox"
            />
          </label>
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
