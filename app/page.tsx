// "use client";

// import { useEffect } from "react";
// import { useRouter } from "next/navigation";

// export default function Home() {
//   const router = useRouter();

//   useEffect(() => {
//     router.replace("/login"); // Redirect to login page
//   }, [router]);

//   return null; // Nothing is rendered while redirecting
// }


"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { getSession } from "next-auth/react";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const checkSession = async () => {
      const session = await getSession();

      if (session?.user?.role === "TEACHER") {
        router.replace("/teacher"); // redirect to teacher dashboard
      } else if (session?.user?.role === "STUDENT") {
        router.replace("/student"); // redirect to student dashboard
      } else {
        router.replace("/login"); // not logged in → login page
      }
    };

    checkSession();
  }, [router]);

  return null; // nothing is rendered while redirecting
}
