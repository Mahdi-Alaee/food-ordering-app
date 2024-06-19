import Link from "next/link";
import { ReactNode } from "react";

interface OvalButtonProps {
  children: ReactNode;
  href: string;
  className?: string;
}

export default function OvalButton({
  children,
  className = 'bg-redColor',
  href,
}: OvalButtonProps) {
  return (
    <Link
      className={`text-white px-6 py-2 rounded-full text-sm font-bold flex items-center gap-x-2 ${className}`}
      href={href}
    >
      {children}
    </Link>
  );
}
