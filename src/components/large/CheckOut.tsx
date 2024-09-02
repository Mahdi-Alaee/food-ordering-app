"use client";

import withSectionHeader from "@/HOFs/withSectionHeader";
import FoodBox from "../small/FoodBox";
import Image from "next/image";
import { useSelector } from "react-redux";
import { RootState } from "@/Redux/store";
import Loading from "@/app/loading";

function CheckOut() {
  const { products: menuItems } = useSelector((state: RootState) => state);

  console.log({menuItems});
  
  if(menuItems?.length < 1) return <Loading />
  return (
    // foods container
    <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 mb-16">
      <div className="hidden absolute left-0 right-0 -mt-48 md:flex justify-between -z-10">
        <Image
          src="/images/sallad1.png"
          alt="sallad png"
          width="10000"
          height="110"
          className="h-56 w-32"
        />
        <Image
          src="/images/sallad2.png"
          alt="sallad png"
          width="10000"
          height="110"
          className="-mt-28 h-56 w-32"
        />
      </div>
      {menuItems.slice(0, 3).map((item) => (
        <FoodBox key={item._id} {...item} />
      ))}
    </div>
  );
}

export default withSectionHeader(CheckOut);
