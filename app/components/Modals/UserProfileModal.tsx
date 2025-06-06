"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { FaCheck } from "react-icons/fa6";
import { signOut, User } from "firebase/auth";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { auth } from "@/db/firebaseClient";

interface CreateModalProps {
  onClose: () => void;
  user: User | null;
}

const formSchema = z.object({
  username: z.string().min(2, "Title must be at least 2 characters"),
  email: z
    .string()
    .min(5, "Description must be at least 5 characters")
    .email("Must be a valid email"),
});

type FormValues = z.infer<typeof formSchema>;
const UserProfileModal = ({ user, onClose }: CreateModalProps) => {
  const router = useRouter();
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: user?.displayName || "",
      email: user?.email || "",
    },
  });

  const onLogout = async () => {
    try {
      await signOut(auth);
      await fetch("/api/logout", { method: "POST" });
      router.push("/auth/sign-in");

      console.log("User logged out");
      onClose();
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const onSubmit = async (data: FormValues) => {
    // Here you can handle the form submission, e.g., update user profile
    console.log("Form submitted:", data);
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <div className="flex items-center justify-between gap-2">
                  <Input className="w-full" placeholder="John" {...field} />
                  <Button onClick={() => onLogout()} variant={"destructive"}>
                    Logout
                  </Button>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="flex-1 w-full">
              <FormLabel>Email</FormLabel>
                <FormControl>
                <div className="flex items-center gap-2">
                  <Input
                    className="w-full"
                    placeholder="John@joe.dho"
                    {...field}
                  />
                  {user?.emailVerified ? (
                    <Button type="button" disabled>
                      Verified
                    </Button>
                  ) : (
                    <Button type="button">Verify</Button>
                  )}
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" variant={"default"}>
          Submit
        </Button>
      </form>
    </Form>
  );
};

export default UserProfileModal;
