import Trash from "@/components/icons/Trash";
import { AppContext, AppContextType } from "@/Context/app";
import { Cart } from "@/types/small-types";
import Image from "next/image";
import { useContext } from "react";

export default function CartItem({
  _id,
  name,
  image,
  count,
  size,
  extras,
  price,
}: Cart) {
  const { removeFromCart } = useContext(AppContext) as AppContextType;

  return (
    <li className="flex justify-between border-b py-4">
      {/* left */}
      <div className="flex items-center gap-x-4 ">
        <Image
          className="w-24"
          src={image!}
          alt={name!}
          width={10000}
          height={10000}
        />
        {/* details */}
        <div>
          {/* name */}
          <p className="font-bold text-black text-lg">{name}</p>
          {/* count */}
          <p className="text-black">
            <span>Count: </span> {count}
          </p>
          {/* size */}
          <p className="text-black">
            <span>Size: </span> {size?.name}
          </p>
          {/* extras */}
          {extras?.map((extra) => (
            <p key={extra.id}>
              Extra {extra.name} ${extra.price}
            </p>
          ))}
        </div>
      </div>
      {/* right */}
      <div className="flex gap-x-4 items-center">
        <span>${price}</span>
        <button
          onClick={() => removeFromCart(_id!)}
          className="border p-2 rounded-lg"
          type="button"
        >
          <Trash />
        </button>
      </div>
    </li>
  );
}
