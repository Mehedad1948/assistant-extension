import React from "react";

type CardProps = {
  children: React.ReactNode;
  maxWidth?: boolean;
  noPadding?: boolean;
  fullHeight?: boolean;
  className?: string;
};

export default function Card({
  children,
  maxWidth = false,
  noPadding = false,
  fullHeight = false,
  className = "",
}: CardProps) {
  const baseStyles =
    "bg-white shadow-md rounded-2xl border border-gray-200";

  const padding = noPadding ? "" : "p-4";
  const width = maxWidth ? "max-w-screen-lg mx-auto" : "";
  const height = fullHeight ? "h-full" : "";

  return (
    <div className={`${baseStyles} ${padding} ${width} ${height} ${className}`}>
      {children}
    </div>
  );
}
