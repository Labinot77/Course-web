"use server";

import { signIn, signOut } from "@/auth";

export const handleSignIn = async (provider: string, email?: string) => {
  if (provider === "resend" && email) {
    await signIn(provider, {
      email,
      redirectTo: "/courses",
    });

  } else {
    await signIn(provider, { redirectTo: "/courses" });
  }
};

export const handleSignOut = async () => {
  await signOut({ redirectTo: "/" });
};
