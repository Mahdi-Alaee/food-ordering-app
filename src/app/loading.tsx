import { FaArrowsRotate } from "react-icons/fa6";
import { HashLoader, PropagateLoader } from "react-spinners";

export default function Loading() {
  return (
    <div className="fixed top-0 left-0 bottom-0 right-0 z-50 bg-white flex justify-center items-center">
      <FaArrowsRotate className="text-redColor text-9xl animate-spin" />
    </div>
  );
}
