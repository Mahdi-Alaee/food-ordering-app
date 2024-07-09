"use client";

import ImageUploader from "@/components/small/ImageUploader";
import { useSession } from "next-auth/react";
import { revalidatePath } from "next/cache";
import Image from "next/image";
import { redirect, useRouter } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";

export default function Profile() {
  const { status, data } = useSession();
  const [newName, setNewName] = useState("");
  const [state, setState] = useState<
    "ok" | "error" | "loading" | "image uploaded" | "image upload failed" | ""
  >("");
  const router = useRouter();
  const [userImage, setUserImage] = useState("");

  useEffect(() => {
    setNewName(data?.user?.name || "");
    setUserImage(data?.user?.image || "");
  }, [data]);

  useEffect(() => {
    if (state === "image uploaded") {
    }

    if (state !== "" && state !== "loading")
      setTimeout(() => {
        setState("");
      }, 2000);
  }, [state]);

  if (status === "loading") {
    return "Loading ...";
  } else if (status !== "authenticated") {
    redirect("/login");
  }

  const onEditUserName = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setState("loading");

    const res = (await fetch("/api/profile", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: data.user?.email,
        newName,
        image: data.user?.image || "",
      }),
    })) as Response;

    console.log({ res });
    if (res.ok) {
      const resData = await res.json();
      if (resData.acknowledged) {
        setState("ok");
        return false;
      }
    }
    setState("error");
  };

  return (
    <main className="mb-16">
      {/* title */}
      <h1 className="text-redColor text-4xl mt-8 text-center mb-10">Profile</h1>

      {/* content */}
      <div className="max-w-md mx-auto flex gap-x-6">
        {/* left */}
        <div className="max-w-2/6">
          {state === "image upload failed" && (
            <h2 className="text-red-500 text-center">an error is occured!</h2>
          )}
          {state === "image uploaded" && (
            <h2 className="text-green-500 text-center">
              the profile image changed successfully
            </h2>
          )}
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
            setState={setState}
            email={data.user?.email!}
            setImage={setUserImage}
          />
        </div>
        {/* right */}
        <form
          className="flex flex-col w-full gap-y-2"
          onSubmit={onEditUserName}
        >
          {/* state */}
          {state === "error" && (
            <h2 className="text-red-500">an error is occured!</h2>
          )}
          {state === "ok" && (
            <h2 className="text-green-500">your name updated successfully!</h2>
          )}
          {state === "loading" && <h2 className="text-blue-500">saving ...</h2>}
          {/* first and last name */}
          <input
            className="border p-2 rounded-xl bg-gray-50 outline-blue-300"
            type="text"
            placeholder="Enter your First and last name ..."
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
          />
          {/* email */}
          <input
            className="border p-2 rounded-xl bg-gray-300/70"
            type="text"
            disabled
            value={data.user?.email!}
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
    </main>
  );
}
