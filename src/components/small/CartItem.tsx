import Plus from "@/components/icons/Plus";
import Trash from "@/components/icons/Trash";
import { AppContext, AppContextType } from "@/Context/app";
import { Cart } from "@/types/small-types";
import Image from "next/image";
import { useContext } from "react";
import { BiMinus } from "react-icons/bi";

interface CartItemProps extends Cart {
  noButtons: boolean;
}

export default function CartItem({
  count,
  _id,
  description,
  extras,
  image,
  name,
  price,
  size,
  noButtons,
}: CartItemProps) {
  const { removeFromCart, addToCart } = useContext(
    AppContext
  ) as AppContextType;
  const props = { count, _id, description, extras, image, name, price, size };  

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
        <span>${+price! * +count}</span>

        {/* right wrapper */}
        <div className="flex flex-col items-center gap-y-2">
          {/* count */}
          <p className="text-black">
            <span>Count: </span> {count}
          </p>
          {noButtons || (
            // {/* buttons */}
            <div className="flex gap-x-2">
              {/* minus */}
              <button
                onClick={() => removeFromCart(_id!)}
                className="border p-2 rounded-lg"
                type="button"
              >
                {count > 1 ? (
                  <BiMinus className="text-gray-800 text-2xl" />
                ) : (
                  <Trash />
                )}
              </button>
              {/* plus */}
              <button
                onClick={() => addToCart(props)}
                className="border p-2 rounded-lg"
              >
                <Plus />
              </button>
            </div>
          )}
        </div>
      </div>
    </li>
  );
}
