/* eslint-disable react-hooks/exhaustive-deps */
import {
  Dispatch,
  FormEvent,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import TextBox from "../small/TextBox";
import { UserData } from "@/types/session";
import { AddressFormData } from "@/types/small-types";

interface AddressFormProps {
  onEditProfile?: (e: FormEvent<HTMLFormElement>) => void;
  user?: UserData;
  formData?: AddressFormData;
  setFormData?: Dispatch<SetStateAction<AddressFormData | undefined>>;
  state?:
    | ""
    | "image uploaded"
    | "image upload failed"
    | "image loading"
    | "redirecting";
  allDisable?: boolean;
}

export default function AddressForm({
  onEditProfile,
  user,
  state,
  setFormData,
  allDisable = false,
}: AddressFormProps) {
  const [newName, setNewName] = useState("");
  const [phone, setPhone] = useState("");
  const [street, setStreet] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");

  useEffect(() => {
    setNewName(user?.name || "");
    setPhone(user?.phone || "");
    setStreet(user?.street || "");
    setPostalCode(user?.postalCode || "");
    setCity(user?.city || "");
    setCountry(user?.country || "");
  }, [user]);

  useEffect(() => {
    setFormData &&
      setFormData({ newName, phone, street, postalCode, city, country });
  }, [newName, phone, street, postalCode, city, country]);

  return (
    <form className="flex flex-col w-full gap-y-2" onSubmit={onEditProfile}>
      {/* first and last name */}
      <TextBox
        label="first name and last name:"
        placeholder="Enter your First and last name ..."
        onChange={(e) => setNewName(e.target.value)}
        value={newName}
        disabled={allDisable}
      />
      {/* email */}
      <TextBox
        label="Email:"
        placeholder="Enter your email ..."
        value={user?.email!}
        disabled
      />
      {/* phone */}
      <TextBox
        label="Phone:"
        placeholder="Enter your phone number ..."
        onChange={(e) => setPhone(e.target.value)}
        value={phone}
        disabled={allDisable}
      />
      {/* street */}
      <TextBox
        label="Street address:"
        onChange={(e) => setStreet(e.target.value)}
        placeholder="Enter your street address ..."
        value={street}
        disabled={allDisable}
      />
      <div className="grid grid-cols-2 gap-x-4">
        {/* postal code */}
        <TextBox
          label="Postal code:"
          onChange={(e) => setPostalCode(e.target.value)}
          placeholder="Enter postal code ..."
          value={postalCode}
          disabled={allDisable}
        />

        {/* city */}
        <TextBox
          label="City:"
          onChange={(e) => setCity(e.target.value)}
          placeholder="Enter your city ..."
          value={city}
          disabled={allDisable}
        />
      </div>
      {/* country */}
      <TextBox
        label="Country:"
        onChange={(e) => setCountry(e.target.value)}
        placeholder="Enter your country..."
        value={country}
        disabled={allDisable}
      />
      {allDisable || (
        // {/* submit */}
        <button
          className="p-2 rounded-xl bg-redColor text-white disabled:opacity-70"
          type="submit"
          disabled={state !== ""}
        >
          Save
        </button>
      )}
    </form>
  );
}
