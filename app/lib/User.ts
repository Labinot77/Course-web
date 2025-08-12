import { auth } from "@/auth";
import { prisma } from "@/prisma";

export const getUserFromDB = async () => {
  try {
    const session = await auth();

    if (!session?.user.email) {
      return null
    }

    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
    });

    if (!user?.email) {
      throw new Error("User not found");
    }

    return user;
  } catch (error) {
    console.error("Failed to fetch user:", error);
    throw new Error("Failed to fetch user");
  }
};
