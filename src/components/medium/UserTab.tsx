import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";

interface UserTabProps {
  href: string;
  children: ReactNode;
}

export default function UserTab({ href, children }: UserTabProps) {
  const pathname = usePathname();
  console.log(pathname);

  return (
    <Link
      className={`bg-gray-300 text-sm text-black px-4 py-2 rounded-full ${
        pathname === href ? "bg-redColor text-white" : ""
      }`}
      href={href}
    >
      {children}
    </Link>
  );
}
