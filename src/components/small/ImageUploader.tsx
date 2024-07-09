import { UploadButton } from "@/utils/uploadthing";
import { Dispatch, SetStateAction, useState } from "react";

export default function ImageUploader({
  email,
  setState,
  setImage,
}: {
  email: string;
  setState: Dispatch<
    SetStateAction<"" | "loading" | "ok" | "error" | "image uploaded" | 'image upload failed'>
  >;
  setImage: Dispatch<SetStateAction<string>>;
}) {
  const [loading, setLoading] = useState(false);

  return (
    <label>
      <UploadButton
        endpoint="imageUploader"
        onUploadError={(err: Error) => {
          console.log(err);
          setState('image upload failed')
          setLoading(false);
        }}
        onClientUploadComplete={async (response) => {
          const image = response[0].url;
          const res = await fetch("/api/profile", {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, image }),
          });
          if (res.ok) {
            setState("image uploaded");
            setImage(image);
          }

          setLoading(false);
        }}
        className="hidden"
        onUploadBegin={() => setLoading(true)}
        disabled={loading}
      />
      <span
        className={`flex justify-center items-center border w-full py-2 rounded-xl mt-1 font-bold duration-150 cursor-pointer 
              hover:border-grayColor hover:bg-grayColor hover:text-white ${
                loading ? "bg-gray-300 text-gray-700" : ""
              }`}
      >
        {loading ? "saving ..." : "Edit"}
      </span>
    </label>
  );
}
