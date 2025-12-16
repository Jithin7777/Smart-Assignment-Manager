import Link from "next/link";
import React from "react";

export function ActionCard({
  title,
  description,
  icon,
  href,
  primary = false,
}: {
  title: string;
  description: string;
  icon: React.ReactNode;
  href: string;
  primary?: boolean;
}) {
  return (
    <Link
      href={href}
      className={`p-5 rounded-xl border block ${
        primary ? "bg-blue-600 text-white" : "bg-white hover:border-blue-300"
      }`}
    >
      {icon}
      <h3 className="font-semibold mt-2">{title}</h3>
      <p className="text-sm">{description}</p>
    </Link>
  );
}
