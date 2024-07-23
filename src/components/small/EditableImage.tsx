import Image from "next/image";
import ImageUploader from "./ImageUploader";
import { Dispatch, SetStateAction } from "react";
import { State } from "@/types/small-types";

interface EditableImageProps {
  image: string;
  setImage: Dispatch<SetStateAction<string>>;
  state: State;
  setState: Dispatch<SetStateAction<State>>;
}

export default function EditableImage({ image,setImage,setState,state }: EditableImageProps) {
  return (
    <div>
      {/* profile photo */}
      {image ? (
        <Image
          src={image}
          alt="person profile image"
          width="10000"
          height="10000"
          className="w-32 object-contain rounded-xl mb-2"
          priority={true}
        />
      ) : (
        <span className="bg-gray-200 py-5 flex justify-center text-nowrap rounded-md text-sm w-28">
          No Image
        </span>
      )}
      {/* edit profile photo */}
      <ImageUploader
        state={state}
        setState={setState}
        setImage={setImage}
      >
        Add
      </ImageUploader>
    </div>
  );
}
