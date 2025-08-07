import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import Resend from "next-auth/providers/resend";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/prisma";

export const { handlers, signIn, signOut, auth } = NextAuth((req) => {
  return {
    adapter: PrismaAdapter(prisma),
    providers: [
      Resend({ apiKey: process.env.RESEND_API_KEY }),
      GitHub,
      Google({
        authorization: {
          params: {
            prompt: "consent",
            access_type: "offline",
            response_type: "code",
          },
        },
      }),
    ],
    callbacks: {
      async session({ session, user }) {
        const dbUser = await prisma.user.findUnique({
          where: { id: user.id },
        });

        if (session.user && dbUser) {
          session.user.id = dbUser.id;
          // Need to tdefine it
          session.user.isAdmin = dbUser.isAdmin;
        }

        return session;
      },
    },
  };
});
