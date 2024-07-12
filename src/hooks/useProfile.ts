import { UserData } from "@/types/session";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export default function useProfile() {
  const { status } = useSession();
  const [user, setUser] = useState<UserData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    setIsLoading(status === "loading");
    if (status === "authenticated")
      (async () => {
        setIsLoading(true);
        const res = await fetch("/api/profile");
        if (res.ok) {
          const user: UserData = await res.json();
          setUser(user);
        }
        setIsLoading(false);
      })();
  }, [status]);
  return { user, isLoading };
}
