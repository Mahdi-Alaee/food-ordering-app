import { UploadButton } from "@/utils/uploadthing";
import { Dispatch, ReactNode, SetStateAction, useState } from "react";

export default function ImageUploader({
  email,
  setState,
  setImage,
  state,
  children = 'Edit',
}: {
  email: string;
  setState: Dispatch<
    SetStateAction<
      "" | "image uploaded" | "image upload failed" | "image loading" | 'redirecting'
    >
  >;
  setImage: Dispatch<SetStateAction<string>>;
  state: "" | "image uploaded" | "image upload failed" | "image loading" | 'redirecting';
  children?: ReactNode;
}) {
  return (
    <label>
      <UploadButton
        endpoint="imageUploader"
        onUploadError={(err: Error) => {
          console.log(err);
          setState("image upload failed");
        }}
        onClientUploadComplete={async (response) => {
          const image = response[0].url;
          // const res = await fetch("/api/profile", {
          //   method: "PUT",
          //   headers: {
          //     "Content-Type": "application/json",
          //   },
          //   body: JSON.stringify({ email, image }),
          // });
          // if (res.ok) {
            setState("image uploaded");
            setImage(image);
          // } else {
          //   setState("image upload failed");
          // }
        }}
        className="hidden"
        onUploadBegin={() => setState("image loading")}
        disabled={state === "image loading"}
      />
      <span
        className={`flex justify-center items-center border w-full py-2 rounded-xl mt-1 font-bold duration-150 cursor-pointer 
              hover:border-grayColor hover:bg-grayColor hover:text-white ${
                state === "image loading" ? "bg-gray-300 text-gray-700" : ""
              }`}
      >
        {state === "image loading" ? "saving ..." : children}
      </span>
    </label>
  );
}
