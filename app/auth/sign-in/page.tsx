"use client";

import { getUser } from "@/app/hooks/getUser";
import { Button } from "@/components/ui/button";
import { auth, googleProvider } from "@/db/firebaseClient";
import { setSessionCookieTest } from "@/lib/setSession";
import { signInWithPopup} from "firebase/auth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { FaGoogle } from "react-icons/fa";

export default function LoginPage() {
  const user = getUser();
  const router = useRouter();

  useEffect(() => {
    if (user.user?.email) {
      router.push("/courses");
    }
  }, [user.user?.email, router]);


  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const idToken = await result.user.getIdToken();

      if (!idToken) {
        throw new Error("Failed to get ID token");
      }

      await setSessionCookieTest(idToken);
      router.push("/courses");
    } catch (err: any) {
      console.error("Login failed:", err.message);
    }
  };

  return (
    <main className="max-w-md mx-auto flex items-center h-screen">
      <div className="flex flex-col w-full gap-2">
        <h1 className="text-2xl text-center">Login with</h1>
        <Button
          className="bg-red-500 text-white p-2 w-full"
          onClick={handleGoogleLogin}
        >
          <FaGoogle />
        </Button>
      </div>
    </main>
  );
}
