"use client";

import FoodBox from "@/components/small/FoodBox";
import { Category, MenuItem } from "@/types/small-types";
import { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import Loading from "../loading";

export default function Menu() {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loadingCategories, setLoadingCategories] = useState(true);
  const [loadingMenuItems, setLoadingMenuItems] = useState(true);

  useEffect(() => {
    (async () => {
      const res = await fetch("/api/menu-item");

      if (res.ok) {
        const items = await res.json();

        setMenuItems(items);
        setLoadingMenuItems(false);
      }
    })();

    (async () => {
      const res = await fetch("/api/category");

      if (res.ok) {
        const cats = await res.json();

        setCategories(cats);
        setLoadingCategories(false);
      }
    })();
  }, []);

  if (loadingCategories || loadingMenuItems) return <Loading />;
  return (
    <main className="mb-16 pt-20">
      {categories.map((cat) => (
        <div key={cat._id}>
          <h2 className="text-5xl text-redColor mb-10 font-bold text-center">
            {cat.name}
          </h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 mb-16">
            {menuItems.map((item) => {
              if (item.category === cat._id)
                return <FoodBox key={item._id} {...item} />;
            })}
          </div>
        </div>
      ))}
      <ToastContainer />
    </main>
  );
}
