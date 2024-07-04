'use client'

import { useSession } from "next-auth/react";
import Image from "next/image";
import { redirect } from "next/navigation";

export default function Profile() {
  const { status, data } = useSession();

  console.log(data?.user);

  if (status === "loading") {
    return "Loading ...";
  } else if (status !== "authenticated") {
    redirect("/login");
  }

  return (
    <main className="mb-16">
      {/* title */}
      <h1 className="text-redColor text-4xl mt-8 text-center mb-10">Profile</h1>

      {/* content */}
      <div className="max-w-md mx-auto flex gap-x-6">
        {/* left */}
        <div className="max-w-2/6">
          {/* profile photo */}
          <Image
            src="/images/person.png"
            alt="person profile image"
            width="10000"
            height="10000"
            className="w-32 object-contain rounded-xl"
          />
          {/* edit button */}
          <button
            className="flex justify-center items-center border w-full py-2 rounded-xl mt-1 font-bold duration-150 hover:border-grayColor hover:bg-grayColor hover:text-white"
            type="button"
          >
            Edit
          </button>
        </div>
        {/* right */}
        <form className="flex flex-col w-full gap-y-2">
          {/* first and last name */}
          <input
            className="border p-2 rounded-xl bg-gray-50 outline-blue-300"
            type="text"
            placeholder="First and last name"
          />
          {/* email */}
          <input
            className="border p-2 rounded-xl bg-gray-300/70"
            type="text"
            disabled
            value="mahdi@gmail.com"
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
