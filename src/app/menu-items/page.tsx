"use client";

import Right from "@/components/icons/Right";
import UserTabs from "@/components/medium/UserTabs";
import useProfile from "@/hooks/useProfile";
import Link from "next/link";
import { redirect } from "next/navigation";

export default function MenuItems() {
  const { isLoading, user } = useProfile();
  if (isLoading) return "Loading ...";
  else if (!user?.isAdmin) redirect("/");
  return (
    <main className="mb-16">
      <UserTabs isAdmin={user?.isAdmin!} />

      {/* content */}
      <div className="max-w-md mx-auto">
        {/* the link of create menu page */}
        <Link
          className="rounded-lg text-black font-bold border flex justify-center gap-x-2 py-2"
          href="/menu-items/new"
        >
           Create new menu <Right />
        </Link>
      </div>
    </main>
  );
}
