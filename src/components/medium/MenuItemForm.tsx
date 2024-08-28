import { FormEvent, useEffect, useState } from "react";
import Plus from "../icons/Plus";
import TextBox from "../small/TextBox";
import TargetDown from "../icons/TargetDown";
import {
  Category,
  MenuItem,
  MenuItemSizeOrExtra,
  State,
} from "@/types/small-types";
import Trash from "../icons/Trash";
import DeleteButton from "../small/DeleteButton";

interface MenuItemFormProps {
  onSubmit: (data: MenuItem) => void;
  state: State;
  categories: Category[];
  isShowDeleteButton?: boolean;
  onDelete?: Function;
  menuItem?: MenuItem;
}

export default function MenuItemForm({
  onSubmit,
  state,
  categories,
  isShowDeleteButton = false,
  onDelete,
  menuItem,
}: MenuItemFormProps) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState<string | number>('');
  const [isSizesOpen, setIsSizesOpen] = useState(false);
  const [isExtrasOpen, setIsExtrasOpen] = useState(false);
  const [sizes, setSizes] = useState<MenuItemSizeOrExtra[]>([]);
  const [extras, setExtras] = useState<MenuItemSizeOrExtra[]>([]);
  const [sizeName, setSizeName] = useState("");
  const [sizePrice, setSizePrice] = useState<string | number>("");
  const [extraName, setExtraName] = useState("");
  const [extraPrice, setExtraPrice] = useState<string | number>("");
  const [category, setCategory] = useState<string>("f");

  useEffect(() => {
    setName(menuItem?.name || "");
    setDescription(menuItem?.description || "");
    setPrice(menuItem?.price || '');
    setSizes(menuItem?.sizes || []);
    setExtras(menuItem?.extras || []);
    setCategory(menuItem?.category || "");
  }, []);

  const onAddSize = () => {
    setSizes((prev:MenuItemSizeOrExtra[]) => {
      return [
        ...prev,
        { id: crypto.randomUUID(), name: sizeName, price: sizePrice as number },
      ]
    });
    setSizeName("");
    setSizePrice("");
  };

  const onDeleteSize = (id: string) => {
    setSizes((prev) => prev.filter((size) => size.id !== id));
  };

  const onAddExtra = () => {
    setExtras((prev:MenuItemSizeOrExtra[]) => {
      return [
      ...prev,
      { id: crypto.randomUUID(), name: extraName, price: extraPrice as number },
    ]
  });
    setExtraName("");
    setExtraPrice("");
  };

  const onDeleteExtra = (id: string) => {
    setExtras((prev) => prev.filter((extra) => extra.id !== id));
  };

  return (
    <form
      className="flex flex-col w-full gap-y-2"
      onSubmit={(e) => {
        e.preventDefault();
        const data = {
          name,
          description,
          price,
          sizes,
          extras,
          category,
        } as MenuItem;

        onSubmit(data);
      }}
    >
      {/* item name */}
      <TextBox
        label="Name:"
        placeholder="Enter item's First and last name ..."
        onChange={(e) => setName(e.target.value)}
        value={name}
      />
      {/* description */}
      <TextBox
        label="Description:"
        placeholder="Enter item's description ..."
        onChange={(e) => setDescription(e.target.value)}
        value={description}
      />
      <div className="flex flex-col">
        {/* label */}
        <span className="text-sm">Category:</span>
        {/* category */}
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="border p-2 rounded-xl outline-none bg-gray-200 disabled:bg-gray-300"
        >
          <option value="f">Choose category ...</option>
          {categories.map(({ _id, name }) => (
            <option key={_id} value={_id}>
              {name}
            </option>
          ))}
        </select>
      </div>

      {/* price */}
      <TextBox
        label="Base price:"
        placeholder="Enter item's price number ..."
        onChange={(e) => setPrice(e.target.value)}
        value={price!}
      />

      {/* sizes */}
      <div className="bg-gray-200 px-2 py-3 rounded-lg">
        <p
          className="flex gap-x-2 text-black cursor-pointer"
          onClick={() => setIsSizesOpen((prev) => !prev)}
        >
          {isSizesOpen ? (
            <span className="font-bold mb-3">Sizes</span>
          ) : (
            <>
              <TargetDown />
              <span className="font-bold">Sizes</span>
              <span className="font-bold">({sizes.length})</span>
            </>
          )}
        </p>
        {isSizesOpen && (
          // {/* content */}
          <div className="flex flex-col gap-y-3">
            {/* list */}
            <ul className="flex flex-col gap-y-3">
              {sizes.map((size) => (
                <li className="flex justify-between items-end" key={size.name}>
                  {/* input */}
                  <div className="w-5/12">
                    <TextBox
                      onChange={(e) => setSizeName(e.target.value)}
                      className="bg-gray-50"
                      label="Name"
                      disabled
                      value={size.name}
                    />
                  </div>
                  {/* input */}
                  <div className="w-5/12">
                    <TextBox
                      onChange={(e) => setSizePrice(e.target.value)}
                      className="bg-gray-50"
                      label="Extra price"
                      disabled
                      value={size.price}
                    />
                  </div>
                  {/* delete button */}
                  <button
                    type="button"
                    className="p-3 flex gap-x-2 text-black font-bold bg-white rounded-xl"
                    onClick={() => onDeleteSize(size.id)}
                  >
                    <Trash />
                  </button>
                </li>
              ))}
              {/* item */}
              <li className="flex justify-between items-end">
                {/* input */}
                <div className="w-5/12">
                  <TextBox
                    onChange={(e) => setSizeName(e.target.value)}
                    className="bg-gray-50"
                    label="Name"
                    value={sizeName}
                  />
                </div>
                {/* input */}
                <div className="w-5/12">
                  <TextBox
                    onChange={(e) => setSizePrice(e.target.value)}
                    className="bg-gray-50"
                    label="Extra price"
                    value={sizePrice}
                  />
                </div>
              </li>
            </ul>
            <button
              type="button"
              className="p-2 flex justify-center gap-x-2 text-black font-bold bg-white rounded-xl"
              onClick={onAddSize}
            >
              <Plus />
              <span>Add item size</span>
            </button>
          </div>
        )}
      </div>

      {/* Extras */}
      <div className="bg-gray-200 px-2 py-3 rounded-lg">
        <p
          className="flex gap-x-2 text-black cursor-pointer"
          onClick={() => setIsExtrasOpen((prev) => !prev)}
        >
          {isExtrasOpen ? (
            <span className="font-bold mb-3">Extra ingredients</span>
          ) : (
            <>
              <TargetDown />
              <span className="font-bold">Extra ingredients</span>
              <span className="font-bold">({extras.length})</span>
            </>
          )}
        </p>
        {isExtrasOpen && (
          // {/* content */}
          <div className="flex flex-col gap-y-3">
            {/* list */}
            <ul className="flex flex-col gap-y-3">
              {extras.map((extra) => (
                <li className="flex justify-between items-end" key={extra.name}>
                  {/* input */}
                  <div className="w-5/12">
                    <TextBox
                      onChange={(e) => setExtraName(e.target.value)}
                      className="bg-gray-50"
                      label="Name"
                      disabled
                      value={extra.name}
                    />
                  </div>
                  {/* input */}
                  <div className="w-5/12">
                    <TextBox
                      onChange={(e) => setExtraPrice(e.target.value)}
                      className="bg-gray-50"
                      label="Extra price"
                      disabled
                      value={extra.price}
                    />
                  </div>
                  {/* delete button */}
                  <button
                    type="button"
                    className="p-3 flex gap-x-2 text-black font-bold bg-white rounded-xl"
                    onClick={() => onDeleteExtra(extra.id)}
                  >
                    <Trash />
                  </button>
                </li>
              ))}
              {/* item */}
              <li className="flex justify-between items-end">
                {/* input */}
                <div className="w-5/12">
                  <TextBox
                    onChange={(e) => setExtraName(e.target.value)}
                    className="bg-gray-50"
                    label="Name"
                    value={extraName}
                  />
                </div>
                {/* input */}
                <div className="w-5/12">
                  <TextBox
                    onChange={(e) => setExtraPrice(e.target.value)}
                    className="bg-gray-50"
                    label="Extra price"
                    value={extraPrice}
                  />
                </div>
              </li>
            </ul>
            <button
              type="button"
              className="p-2 flex justify-center gap-x-2 text-black font-bold bg-white rounded-xl"
              onClick={onAddExtra}
            >
              <Plus />
              <span>Add Extra ingredient</span>
            </button>
          </div>
        )}
      </div>

      {/* submit */}
      <button
        className="p-2 rounded-xl bg-redColor text-white disabled:opacity-70"
        type="submit"
        disabled={state !== ""}
      >
        Save
      </button>
      {isShowDeleteButton && (
        <DeleteButton
          className="p-2 rounded-xl border border-gray-300 disabled:opacity-70"
          onDelete={onDelete!}
          disabled={state !== ""}
        >
          Delete this menu item
        </DeleteButton>
      )}
    </form>
  );
}
