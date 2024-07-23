"use client";

import UserTab from "./UserTab";

const userTabs = [{ id: 1, href: "/profile", text: "Profile" }];

const adminTabs = [
  { id: 1, href: "/categories", text: "Categories" },
  { id: 2, href: "/menu-items", text: "Menu Items" },
  { id: 3, href: "/users", text: "Users" },
  { id: 4, href: "/orders", text: "Orders" },
];

interface UserTabsProps {
  isAdmin: boolean;
}

export default function UserTabs({ isAdmin }: UserTabsProps) {
  return (
    <div className="flex justify-center mt-12 pb-9">
      <div className="flex gap-x-2">
        {userTabs.map((tab) => (
          <UserTab key={tab.id} href={tab.href}>
            {tab.text}
          </UserTab>
        ))}
        {isAdmin && (
          <>
            {adminTabs.map((tab) => (
              <UserTab key={tab.id} href={tab.href}>
                {tab.text}
              </UserTab>
            ))}
          </>
        )}
      </div>
    </div>
  );
}
