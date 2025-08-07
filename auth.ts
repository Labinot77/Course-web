import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import Resend from "next-auth/providers/resend";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/prisma";

declare module "next-auth" {
  interface Session {
    user: {
      isAdmin?: boolean;
      [key: string]: any;
    };
  }
}

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
        if (session?.user?.email) {
          const dbUser = await prisma.user.findUnique({
            where: { email: session.user.email },
          });
          if (dbUser) {
            session.user.isAdmin = dbUser.isAdmin; // <-- Add isAdmin here
          }
        }
        return session;
      },
    },
  };
});
