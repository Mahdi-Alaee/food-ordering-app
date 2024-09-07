import Link from "next/link";
import React, { MouseEventHandler, ReactNode } from "react";

interface OvalButtonProps {
  children: ReactNode;
  href?: string;
  className?: string;
  onClick?: Function;
  type?: "link" | "button";
  disabled?: boolean
}

export default function OvalButton({
  children,
  className = "bg-redColor",
  href,
  onClick,
  type = "link",
  disabled = false
}: OvalButtonProps) {
  return type === "link" && !disabled ? (
    <Link
      className={`text-white px-6 py-2 rounded-full text-sm font-bold flex items-center gap-x-2 ${className}`}
      href={href || ""}
      onClick={onClick as MouseEventHandler<HTMLAnchorElement>}
    >
      {children}
    </Link>
  ) : (
    <button
      className={`text-white px-6 py-2 rounded-full text-sm font-bold flex items-center gap-x-2 disabled:opacity-50 ${className}`}
      onClick={onClick as MouseEventHandler<HTMLButtonElement>}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
