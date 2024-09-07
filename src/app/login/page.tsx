"use client";

import { signIn } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { FormEvent, useState } from "react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";

  const onLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    try {
      const res = await signIn("credentials", {
        redirect: false,
        callbackUrl,
        email,
        password,
      });
      
      if (res?.ok) {
        router.push(callbackUrl);
      } else {
        setError("The credentials is not valid!");
      }
    } catch (err) {
      setError("An error has occured!");
    }
    setIsLoading(false);
  };

  return (
    <main>
      {/* title */}
      <h1 className="text-redColor text-4xl mt-8 text-center">Login</h1>
      {/* Login form */}
      <form className="max-w-80 mx-auto mt-4 mb-16" onSubmit={onLogin}>
      
        {/* alternative text */}
        <p className="py-4 text-center">login with providers</p>
        {/* buttons container */}
        <div className="w-full flex flex-col gap-y-2">
          {/* google button */}
          {/* <button
            onClick={() => signIn("google", { callbackUrl: "/" })}
            type="button"
            className="border py-2 text-black font-bold rounded-xl flex items-center justify-center gap-x-4"
          >
            <Image
              src="/images/google.png"
              alt="google png"
              width="24"
              height="24"
            />
            Login with google
          </button> */}
          {/* github button */}
          <button
            className="border py-2 text-black font-bold rounded-xl flex items-center justify-center gap-x-4"
            onClick={() => {
              signIn("github", {
                callbackUrl: "/",
              });
            }}
            type="button"
          >
            <Image
              src="/images/github.png"
              alt="github png"
              width="24"
              height="24"
            />
            Login with github
          </button>
        </div>
        {/* spliter border */}
        <div className="border-t my-4"></div>
        {/* existing account */}
        <div className="text-center">
          {/* question */}
          <span>{"haven't any account?"} </span>
          {/* register */}
          <Link className="underline" href="/register">
            Register here »
          </Link>
        </div>
      </form>
    </main>
  );
}

//   {/* Login container */}
//   <div className="flex flex-col gap-y-2">
//   {/* email */}
//   <input
//     value={email}
//     onChange={(e) => setEmail(e.target.value)}
//     className="border outline-none border-gray-300 bg-gray-100 p-2 rounded-xl"
//     type="email"
//     placeholder="email"
//   />
//   {/* password */}
//   <input
//     value={password}
//     onChange={(e) => setPassword(e.target.value)}
//     className="border outline-none border-gray-300 bg-gray-100 p-2 rounded-xl"
//     type="password"
//     placeholder="password"
//   />
//   {/* submit button */}
//   <button
//     className="bg-redColor text-white border font-bold rounded-xl py-2 disabled:bg-red-400 disabled:cursor-not-allowed"
//     type="submit"
//     disabled={isLoading}
//   >
//     {isLoading ? "Loading ..." : "Login"}
//   </button>
//   {/* error */}
//   <p className="text-center text-red-400">{error}</p>
// </div>