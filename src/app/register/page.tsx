"use client";

import { signIn } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { FormEvent, useState } from "react";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const registerHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      console.log(res);
      if (res.ok) {
        const data = await res.json();
        console.log(data);
      } else {
        setError(
          "your entered data is not valid (password must be greater than 7 caracters and email must be unique)"
        );
      }
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      setError(
        "your entered data is not valid (password must be greater than 7 caracters and email must be unique)"
      );
    }
  };

  return (
    <main>
      {/* title */}
      <h1 className="text-redColor text-4xl mt-8 text-center">Register</h1>
      {/* register form */}
      <form className="max-w-80 mx-auto mt-4 mb-16" onSubmit={registerHandler}>
        {/* Register container */}
        <div className="flex flex-col gap-y-2">
          {/* email */}
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border outline-none border-gray-300 bg-gray-100 p-2 rounded-xl"
            type="email"
            placeholder="email"
          />
          {/* password */}
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border outline-none border-gray-300 bg-gray-100 p-2 rounded-xl"
            type="password"
            placeholder="password"
          />
          {/* submit button */}
          <button
            className="bg-redColor text-white border font-bold rounded-xl py-2 disabled:bg-red-400 disabled:cursor-not-allowed"
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? "Loading ..." : "Register"}
          </button>
          {/* error */}
          <p className="text-center text-red-400">{error}</p>
        </div>
        {/* alternative text */}
        <p className="py-4 text-center">or login with providers</p>
        {/* buttons container */}
        <div className="w-full flex flex-col gap-y-2">
          {/* google button */}
          <button
            className="border py-2 text-black font-bold rounded-xl flex items-center justify-center gap-x-4"
            onClick={() => {
              signIn("google", {
                callbackUrl: "/",
              });
            }}
            type="button"
          >
            <Image
              src="/images/google.png"
              alt="google png"
              width="24"
              height="24"
            />
            Login with google
          </button>
        </div>
        {/* spliter border */}
        <div className="border-t my-4"></div>
        {/* existing account */}
        <div className="text-center">
          {/* question */}
          <span>Existing account? </span>
          {/* login */}
          <Link className="underline" href="/login">
            Login here »
          </Link>
        </div>
      </form>
    </main>
  );
}
