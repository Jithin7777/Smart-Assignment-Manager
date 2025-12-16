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


import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <Link
        href="/login"
        className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
      >
        Go to Login
      </Link>
    </div>
  );
}
