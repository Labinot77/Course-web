"use client";

import { FaGithub, FaGoogle } from "react-icons/fa";
import { handleSignIn } from "../lib/Auth";
import { DefaultButton } from "../components/buttons/Buttons";
import { useEffect, useRef } from "react";
import { toast } from "sonner";
import { useRouter, useSearchParams } from "next/navigation";

import { UseUser } from "../hooks/useUser";

export default function LoginPage() {
  const searchParams = useSearchParams();
  const reason = searchParams.get("reason");
  const router = useRouter();
  const user = UseUser();

  useEffect(() => {
    // if (user) {
    //   router.push("/courses");
    //   toast.success("Welcome back!");
    // }

    if (reason === "unauthenticated") {
      toast.error("You must be logged in to access that page.");
      console.log("User is unauthenticated");
    }

  }, [reason, router]);

  return (
    <main className="flex flex-start">
      <div className="h-screen px-32 flex flex-col items-center justify-center gap-4">
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
      </div>
      <div className="w-full h-screen relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-fade pointer-events-none" />
        {/* Your content here */}
      </div>
    </main>
  );
}
