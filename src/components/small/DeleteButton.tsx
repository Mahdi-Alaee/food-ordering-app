import { ReactNode, useState } from "react";

interface DeleteButtonProps {
  children: ReactNode;
  onDelete: Function;
  className?:string
}

export default function DeleteButton({
  children,
  onDelete,
  className
}: DeleteButtonProps) {
  const [isShowModal, setIsShowModal] = useState(false);

  if (isShowModal)
    return (
      <div>
        <h3>Are you sure about deleting?</h3>
        <button type="button">Cancel</button>
        <button
          type="button"
          onClick={() => {
            onDelete();
            setIsShowModal(false);
          }}
        >
          Yes, delete!
        </button>
      </div>
    );

  return (
    <button className={className} type="button" onClick={() => setIsShowModal(true)}>
      {children}
    </button>
  );
}
