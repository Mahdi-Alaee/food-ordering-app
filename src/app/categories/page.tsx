"use client";

import UserTabs from "@/components/medium/UserTabs";
import { UserData } from "@/types/session";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export default function Categories() {
  const { status } = useSession();
  const [user, setUser] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    if (status === "authenticated")
      (async () => {
        setLoading(true);
        const res = await fetch("/api/profile");
        if (res.ok) {
          const user: UserData = await res.json();
          setUser(user);
        }
        setLoading(false);
      })();
  }, [status]);

  console.log({ user });

  if (status === "loading" || loading) {
    return "Loading ...";
  } else if (status === "unauthenticated") {
    return "Error";
  } else if (!user?.isAdmin) {
    return "you are not an admin!";
  }
  return (
    <main>
      {/* tabs */}
      <UserTabs isAdmin={user?.isAdmin!} />
    </main>
  );
}
