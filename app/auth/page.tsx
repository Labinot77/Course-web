"use client";

import { FaGithub, FaGoogle } from "react-icons/fa";
import { handleSignIn } from "../lib/Auth";
import { DefaultButton } from "../components/buttons/Buttons";
import { useEffect, useRef } from "react";
import { toast } from "sonner";
import { useSearchParams } from "next/navigation";

export default function LoginPage() {
  const searchParams = useSearchParams();
  const reason = searchParams.get("reason");
  const emailRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (reason === "unauthenticated") {
      toast.error("You must be logged in to access that page.");
      console.log("User is unauthenticated");
    }
  }, [reason]);

  return (
    <main className="h-screen w-full flex flex-col items-center justify-center gap-4">
      <h1 className="text-3xl font-bold">Authentication</h1>

      <div className="flex gap-3">
      <DefaultButton
        size={"lg"}
        isReactive={true}
        onClick={() => handleSignIn("github")}
      >
        <p>Login with</p> <FaGithub className="ml-2" />
      </DefaultButton>
      <DefaultButton size={"lg"} onClick={() => handleSignIn("google")}>
        Login with <FaGoogle className="ml-2" />
      </DefaultButton>

      </div>

      <p className="mt-24 text-sm text-gray-500">
        All account information is encrypted using AuthJS
      </p>
    </main>
  );
}
