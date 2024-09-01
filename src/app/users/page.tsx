"use client";

import UserTabs from "@/components/medium/UserTabs";
import DeleteButton from "@/components/small/DeleteButton";
import TextBox from "@/components/small/TextBox";
import useProfile from "@/hooks/useProfile";
import { UserData } from "@/types/session";
import { Category } from "@/types/small-types";
import { User } from "next-auth";
import Link from "next/link";
import { redirect } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";

export default function Users() {
  const { isLoading, user } = useProfile();
  const [users, setUsers] = useState<UserData[]>([]);

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    const res = await fetch("/api/user");
    if (res.ok) {
      const users = await res.json();
      setUsers(users);
    }
  };

  const onDeleteUser = async (id: string) => {
    const DeleteUser = new Promise(async (resolve, reject) => {
      const res = await fetch("/api/user?_id=" + id, {
        method: "DELETE",
      });
      if (res.ok) {
        getUsers();
        resolve(res);
      } else reject();
    });

    toast.promise(DeleteUser, {
      pending: "Loading ...",
      success: "User deleted successfully",
      error: "An error has occured",
    });
  };

  if (isLoading) {
    return "Loading ...";
  } else if (user === null) {
    redirect("/profile");
  } else if (!user?.isAdmin) {
    redirect("/profile");
  }
  return (
    <main className="mb-16">
      {/* tabs */}
      <UserTabs isAdmin={user?.isAdmin!} />
      {/* content */}
      <div className="max-w-2xl mx-auto">
        {/* categories */}
        <div>
          {/* title */}
          {users.length < 1 ? (
            <span className="text-red-500">No items are avalible!</span>
          ) : (
            <>
              <span className="block text-sm mb-3 text-center sm:text-left">Edit category:</span>
              {/* items */}
              <ul className="flex flex-col gap-y-1">
                {users.map((user) => (
                  <li
                    key={user.email}
                    className="flex flex-col gap-y-3 mx-12 justify-center sm:flex-row sm:justify-between items-center bg-gray-200 px-4 py-2 text-black font-bold rounded-xl cursor-pointer"
                  >
                    <span>
                      {user.name || (
                        <span className="text-redColor">No name</span>
                      )}
                    </span>

                    <span className="text-sm opacity-70">{user.email}</span>

                    {/* buttons */}
                    <div className="flex gap-x-2">
                      <Link
                        className="py-2 px-6 rounded-lg border border-gray-300 hover:bg-gray-100"
                        href={"/users/" + user._id}
                      >
                        Edit
                      </Link>
                      <DeleteButton
                        className="py-2 px-6 rounded-lg border border-gray-300 hover:bg-red-500 hover:text-white"
                        onDelete={() => onDeleteUser(user._id!)}
                      >
                        Delete
                      </DeleteButton>
                    </div>
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>
      </div>
      <ToastContainer />
    </main>
  );
}
