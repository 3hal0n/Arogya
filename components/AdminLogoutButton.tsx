"use client";
import { useRouter } from "next/navigation";


export default function AdminLogoutButton() {
  const router = useRouter();
  return (
    <button
      onClick={() => {
        localStorage.removeItem("accessKey");
        router.push("/");
      }}
      className="shadow-red-700 px-4 py-2 rounded-md text-14-medium bg-red-700 hover:bg-red-800 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
    >
      Logout
    </button>
  );
} 