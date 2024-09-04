"use client";

import FoodBox from "@/components/small/FoodBox";
import { Category, MenuItem } from "@/types/small-types";
import { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import Loading from "../loading";
import { useSelector } from "react-redux";
import { RootState } from "@/Redux/store";

export default function Menu() {
  const { products: menuItems, categories } = useSelector(
    (state: RootState) => state
  );

  return (
    <main className="mb-16 pt-20">
      {categories.map((cat) => (
        <div key={cat._id}>
          <h2 className="text-5xl text-redColor mb-10 font-bold text-center">
            {cat.name}
          </h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 mb-16">
            {menuItems.findIndex((item) => item.category === cat._id) !== -1 ? (
              menuItems.map((item) => {
                if (item.category === cat._id)
                  return <FoodBox key={item._id} {...item} />;
              })
            ) : (
              <>
              <span></span>
              <p className="text-red-500 text-center text-2xl mt-12 w-full">
                No items are avalible!
              </p>
              </>
            )}
          </div>
        </div>
      ))}
      <ToastContainer />
    </main>
  );
}
