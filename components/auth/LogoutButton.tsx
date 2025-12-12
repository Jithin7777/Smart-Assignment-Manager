"use client";

import { signOut } from "next-auth/react";
import { Button } from "../ui/button";

export default function LogoutButton() {
  return (
    <Button
      onClick={() => signOut({ callbackUrl: "/login" })}
      className="mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
    >
      Logout
    </Button>
  );
}
