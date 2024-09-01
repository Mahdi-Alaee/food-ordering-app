"use client";

import UserTab from "./UserTab";

const tabs = [
  { id: 1, href: "/profile", text: "Profile", mustAdmin: false },
  { id: 2, href: "/categories", text: "Categories", mustAdmin: true },
  { id: 3, href: "/menu-items", text: "Menu Items", mustAdmin: true },
  { id: 4, href: "/users", text: "Users", mustAdmin: true },
  { id: 5, href: "/orders", text: "Orders", mustAdmin: false },
];

interface UserTabsProps {
  isAdmin: boolean;
}

export default function UserTabs({ isAdmin }: UserTabsProps) {
  return (
    <div className="flex justify-center mt-12 pb-9">
      <div className="flex gap-2 justify-center flex-wrap">
        {tabs.map((tab) => {
          if (isAdmin) {
            return (
              <UserTab key={tab.id} href={tab.href}>
                {tab.text}
              </UserTab>
            );
          }
          return (
            tab.mustAdmin || (
              <UserTab key={tab.id} href={tab.href}>
                {tab.text}
              </UserTab>
            )
          );
        })}
      </div>
    </div>
  );
}
