"use server";

import { signIn, signOut } from "@/auth";

export const handleSignIn = async (provider: string) => {
  await signIn(provider, { redirectTo: "/courses" });
};

export const handleSignOut = async () => {
  await signOut({ redirectTo: "/" });
};
