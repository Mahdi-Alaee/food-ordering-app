'use client'

import UserTabs from "@/components/medium/UserTabs";
import useProfile from "@/hooks/useProfile";

export default function Orders() {
    const {isLoading,user} = useProfile()
    if(isLoading)
        return 'Loading...' 
  return (
    <main className="mb-16">
      <UserTabs isAdmin={user?.isAdmin!} />

      <h1>orders</h1>
    </main>
  );
}
