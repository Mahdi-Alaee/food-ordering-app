"use client";

import Right from "@/components/icons/Right";
import UserTabs from "@/components/medium/UserTabs";
import useProfile from "@/hooks/useProfile";
import { MenuItem } from "@/types/small-types";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";

export default function MenuItems() {
  const { isLoading, user } = useProfile();
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);

  useEffect(() => {
    (async () => {
      const res = await fetch("/api/menu-item");
      if (res.ok) {
        const data = await res.json();

        setMenuItems(data);
      }
    })();
  }, []);

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

        {/* menuItems */}
        <div>
          {/* title */}
          {menuItems.length < 1 ? (
            <p className="text-red-500 text-center mt-12">No items are avalible!</p>
          ) : (
            <>
              <span className="text-sm">Edit category:</span>
              {/* items */}
              <div className="grid grid-cols-3 gap-2">
                {menuItems.map((item) => (
                  <Link
                    href={`/menu-items/edit/${item._id}`}
                    key={item._id}
                    className="flex flex-col justify-between gap-y-4 bg-gray-200 px-4 py-2 text-black font-bold rounded-xl cursor-pointer"
                  >
                    <Image
                      className=""
                      src={item.image}
                      alt="menu item"
                      width="10000"
                      height="10000"
                    />
                    <span className="text-center">{item.name}</span>
                  </Link>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </main>
  );
}
