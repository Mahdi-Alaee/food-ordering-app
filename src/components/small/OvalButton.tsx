import Link from "next/link";
import React, { MouseEventHandler, ReactNode } from "react";

interface OvalButtonProps {
  children: ReactNode;
  href?: string;
  className?: string;
  onClick?: Function;
  type?: "link" | "button";
}

export default function OvalButton({
  children,
  className = "bg-redColor",
  href,
  onClick,
  type = "link",
}: OvalButtonProps) {
  return type === "link" ? (
    <Link
      className={`text-white px-6 py-2 rounded-full text-sm font-bold flex items-center gap-x-2 ${className}`}
      href={href || ""}
      onClick={onClick as MouseEventHandler<HTMLAnchorElement>}
    >
      {children}
    </Link>
  ) : (
    <button
      className={`text-white px-6 py-2 rounded-full text-sm font-bold flex items-center gap-x-2 ${className}`}
      onClick={onClick as MouseEventHandler<HTMLButtonElement>}
    >
      {children}
    </button>
  );
}
