"use client";

import { FaGithub, FaGoogle } from "react-icons/fa";
import { handleSignIn } from "../lib/Auth";
import { DefaultButton } from "../components/buttons/Buttons";

export default function LoginPage() {
  // Use card to improve the look of the auth
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
