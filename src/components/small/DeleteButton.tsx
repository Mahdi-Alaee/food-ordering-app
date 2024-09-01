import { ReactNode, useState } from "react";

interface DeleteButtonProps {
  children: ReactNode;
  onDelete: Function;
  className?: string;
  disabled?: boolean
}

export default function DeleteButton({
  children,
  onDelete,
  className,
  disabled
}: DeleteButtonProps) {
  const [isShowModal, setIsShowModal] = useState(false);

  if (isShowModal)
    return (
      <div className="flex justify-center items-center fixed z-50 bg-black/80 top-0 left-0 right-0 bottom-0">
        <div className="bg-white p-4">
          <h3 className="text-center text-lg">Are you sure about deleting?</h3>
          <button
            className="py-2 px-6 rounded-lg border border-gray-300 mr-3 mt-4"
            type="button"
            onClick={() => setIsShowModal(false)}
          >
            Cancel
          </button>
          <button
            className="py-2 px-6 rounded-lg border bg-red-500 text-white"
            type="button"
            onClick={() => {
              onDelete();
              setIsShowModal(false);
            }}
          >
            Yes, delete!
          </button>
        </div>
      </div>
    );

  return (
    <button
      className={className}
      type="button"
      onClick={() => setIsShowModal(true)}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
