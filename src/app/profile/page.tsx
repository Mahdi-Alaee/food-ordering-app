"use client";

import { useSession } from "next-auth/react";
import Image from "next/image";
import { redirect } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";

export default function Profile() {
  const { status, data } = useSession();
  const [newName, setNewName] = useState("");
  const [state, setState] = useState<"ok" | "error" | "">("");

  useEffect(() => {
    setNewName(data?.user?.name || "");
  }, [data]);

  useEffect(() => {
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

    console.log({ newName });

    const res = (await fetch("/api/auth/name", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: data.user?.email,
        newName,
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
          {data.user?.image ? (
            //   {/* profile photo */}
            <Image
              src={data.user?.image}
              alt="person profile image"
              width="10000"
              height="10000"
              className="w-32 object-contain rounded-xl"
            />
          ) : (
            <Image
              src="/images/person.png"
              alt="person profile image"
              width="10000"
              height="10000"
              className="w-32 object-contain rounded-xl"
            />
          )}
          {/* edit button */}
          <button
            className="flex justify-center items-center border w-full py-2 rounded-xl mt-1 font-bold duration-150 hover:border-grayColor hover:bg-grayColor hover:text-white"
            type="button"
          >
            Edit
          </button>
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
            className="p-2 rounded-xl bg-redColor text-white"
            type="submit"
          >
            Save
          </button>
        </form>
      </div>
    </main>
  );
}
