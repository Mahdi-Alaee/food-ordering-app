"use client";

import UserTabs from "@/components/medium/UserTabs";
import TextBox from "@/components/small/TextBox";
import useProfile from "@/hooks/useProfile";
import { Category } from "@/types/small-types";
import { redirect } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";

export default function Categories() {
  const { isLoading, user } = useProfile();
  const [name, setName] = useState("");
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<Category | {}>({});

  const formSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const EditCategoryPromise = new Promise(async (resolve, reject) => {
      if (!("_id" in selectedCategory)) return false;
      const res = await fetch("/api/category", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          _id: selectedCategory._id,
          name,
        }),
      });

      if (res.ok) {
        getCategories();
        setName("");
        setSelectedCategory({});
        resolve(res);
      } else reject();
    });
    const CreateCategoryPromise = new Promise(async (resolve, reject) => {
      if ("name" in selectedCategory) {
        return false;
      }
      const res = await fetch("/api/category", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name }),
      });

      if (res.ok) {
        setName("");
        getCategories()
        resolve(res);
      } else reject();
    });
    console.log(selectedCategory);

    if ("name" in selectedCategory) {
      console.log(1);

      toast.promise(EditCategoryPromise, {
        pending: "Loading ...",
        success: "The category edited successfully",
        error: "An error is occured",
      });
    } else {
      console.log(2);
      toast.promise(CreateCategoryPromise, {
        pending: "Loading ...",
        success: "The category edited successfully",
        error: "An error is occured",
      });
    }
  };

  const getCategories = async () => {
    const res = await fetch("/api/category");
    if (res.ok) {
      const categories = await res.json();
      setCategories(categories);
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  useEffect(() => {
    if ("name" in selectedCategory) setName(selectedCategory.name);
  }, [selectedCategory]);

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
      <div className="max-w-md mx-auto">
        {/* form */}
        <form
          className="flex gap-x-2 items-end justify-between mb-16"
          onSubmit={formSubmit}
        >
          <div className="w-9/12">
            <TextBox
              onChange={(e) => setName(e.target.value)}
              value={name}
              label={`${
                "name" in selectedCategory
                  ? `Update category: ${selectedCategory.name}`
                  : "New category name:"
              }`}
            />
          </div>
          <button
            className="w-3/12 p-2 rounded-xl bg-redColor text-white disabled:opacity-70"
            type="submit"
          >
            {"name" in selectedCategory ? "Edit" : "Create"}
          </button>
        </form>
        {/* categories */}
        <div>
          {/* title */}
          {categories.length < 1 ? (
            <span className="text-red-500">No items are avalible!</span>
          ) : (
            <>
              <span className="text-sm">Edit category:</span>
              {/* items */}
              <ul className="flex flex-col gap-y-1">
                {categories.map((cat) => (
                  <li
                    key={cat._id}
                    className="bg-gray-200 px-4 py-2 text-black font-bold rounded-xl cursor-pointer"
                    onClick={() => setSelectedCategory(cat)}
                  >
                    {cat.name}
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