import Image from "next/image";
import Link from "next/link";

export default function Register() {
  return (
    <main>
      {/* title */}
      <h1 className="text-redColor text-4xl mt-8 text-center">Register</h1>
      {/* register form */}
      <form className="max-w-80 mx-auto mt-4 mb-16">
        {/* Register container */}
        <div className="flex flex-col gap-y-2">
          {/* email */}
          <input className="border outline-none border-gray-300 bg-gray-100 p-2 rounded-xl" type="email" placeholder="email" />
          {/* password */}
          <input className="border outline-none border-gray-300 bg-gray-100 p-2 rounded-xl" type="password" placeholder="password" />
          {/* submit button */}
          <button className="bg-redColor text-white border font-bold rounded-xl py-2" type="submit">Register</button>
        </div>
        {/* alternative text */}
        <p className="py-4 text-center">or login with providers</p>
        {/* buttons container */}
        <div className="w-full flex flex-col gap-y-2">
          {/* google button */}
          <button className="border py-2 text-black font-bold rounded-xl flex items-center justify-center gap-x-4">
            <Image src='/images/google.png' alt="google png" width='24' height='24' />
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
          <Link className="underline" href="/login">Login here »</Link>
        </div>
      </form>
    </main>
  );
}
