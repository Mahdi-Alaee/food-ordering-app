import Link from "next/link";
import React, { MouseEventHandler, ReactNode } from "react";

interface OvalButtonProps {
  children: ReactNode;
  href?: string;
  className?: string;
  onClick?: MouseEventHandler<HTMLAnchorElement>;
}

export default function OvalButton({
  children,
  className = "bg-redColor",
  href,
  onClick,
}: OvalButtonProps) {
  return (
    <Link
      className={`text-white px-6 py-2 rounded-full text-sm font-bold flex items-center gap-x-2 ${className}`}
      href={href || ''}
      onClick={onClick}
    >
      {children}
    </Link>
  );
}
