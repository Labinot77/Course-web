"use client";

import { useRouter } from "next/navigation";
import { getUser } from "../hooks/getUser";
import { signOut } from "firebase/auth";
import { auth } from "@/db/firebaseClient";

export function UserProfile() {
  const user = getUser().user
  const router = useRouter();

  const handleLogout = async () => {
      try {
    await signOut(auth); 
    await fetch("/api/logout", { method: "POST" });
    router.push("/auth/sign-in");
  } catch (error) {
    console.error("Logout failed:", error);
  }
};



  return (
    <div className="p-4 space-y-2">
      <p>
        <strong>Email:</strong> {user?.email}
      </p>
      <p>
        <strong>UID:</strong> {user?.uid}
      </p>  
      <p>
        <strong>Name:</strong> {user?.displayName || "No name"}
      </p>
      <button
        onClick={handleLogout}
        className="mt-2 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
      >
        Logout
      </button>
    </div>
  );
}

export default UserProfile;