// "use client";

// import { Button } from "@/components/ui/button";
// import { signOut } from "next-auth/react";

// export default function LogoutButton() {
//   return (
//     <Button
//       onClick={() => signOut({ callbackUrl: "/login" })}
//       className="mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
//     >
//       Logout
//     </Button>
//   );
// }




"use client";

import { Button } from "@/components/ui/button";
import { signOut } from "next-auth/react";

export default function LogoutButton() {
  return (
    <Button
      onClick={() =>
        signOut({ callbackUrl: "https://smart-assignment-manager.vercel.app/login" })
      }
      className="mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
    >
      Logout
    </Button>
  );
}
