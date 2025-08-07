"use client";

import { FaGithub, FaGoogle } from "react-icons/fa";
import { handleSignIn } from "../lib/Auth";
import { DefaultButton } from "../components/buttons/Buttons";
import { useEffect, useRef } from "react";
import { toast } from "sonner";
import { useSearchParams } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";

export default function LoginPage() {
  const searchParams = useSearchParams();
  const reason = searchParams.get("reason");
  const emailRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (reason === "unauthenticated") {
      toast.error("You must be logged in to access that page.");
    }
  }, [reason]);

 const handleMagicLink = async (e: React.FormEvent) => {
    e.preventDefault(); 
    const email = emailRef.current?.value;

    if (!email) {
      toast.error("Please enter a valid email.");
      return;
    }

    try {
      await handleSignIn("resend", email);
      toast.success("Magic link sent!");
    } catch (error) {
      toast.error("Failed to send magic link.");
    }
  };

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

      {/* <Separator className="w-36" />

      <form onSubmit={handleMagicLink} className="flex w-max items-center gap-2">
        <Input
          className=""
          type="email"
          placeholder="Email"
          name="email"
          ref={emailRef}
        />
        <DefaultButton type="submit" isReactive >
          Sign in
        </DefaultButton>
      </form> */}

      <p className="mt-24 text-sm text-gray-500">
        All account information is encrypted using AuthJS
      </p>
    </main>
  );
}
