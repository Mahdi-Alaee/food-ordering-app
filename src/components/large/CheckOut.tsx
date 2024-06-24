import withSectionHeader from "@/HOFs/withSectionHeader";
import FoodBox from "../small/FoodBox";
import Image from "next/image";

function CheckOut() {
  return (
    // foods container
    <div className="grid grid-cols-3 gap-4 mb-16">
      <div className="absolute left-0 right-0 -mt-48 flex justify-between -z-10">
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
      <FoodBox />
      <FoodBox />
      <FoodBox />
      <FoodBox />
      <FoodBox />
      <FoodBox />
    </div>
  );
}

export default withSectionHeader(CheckOut);
