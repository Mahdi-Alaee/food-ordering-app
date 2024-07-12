"use client";

import UserTabs from "@/components/medium/UserTabs";
import useProfile from "@/hooks/useProfile";
import { redirect } from "next/navigation";

export default function Categories() {
  const { isLoading, user } = useProfile();

  console.log({ user });

  if (isLoading) {
    return "Loading ...";
  } else if (user === null) {
    redirect("/profile");
  } else if (!user?.isAdmin) {
    redirect("/profile");
  }
  return (
    <main>
      {/* tabs */}
      <UserTabs isAdmin={user?.isAdmin!} />
    </main>
  );
}
