"use client";

import { useState } from "react";
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
import { Button } from "@/components/ui/button";
import { handleSignOut } from "@/app/lib/Auth";
import { toast } from "sonner";
import Image from "next/image";
import { DefaultButton } from "../buttons/Buttons";
import { Separator } from "@/components/ui/separator";
import { UseUser } from "@/app/hooks/useUser";
import { deleteRequest } from "@/app/lib/api/Delete";

interface CreateModalProps {
  onClose: () => void;
}

const HandleSignOut = async () => {
  toast.success("You have been signed out successfully.");
  await handleSignOut();
};

const handleDeleteAccount = async () => {
  try {
    await deleteRequest("/api/auth/user/delete");

    await HandleSignOut()
    toast.success("Your account has been deleted successfully.");
  } catch (error) {
    console.error("Failed to delete account:", error);
  }
};

const formSchema = z.object({
  username: z.string().min(2, "Title must be at least 2 characters"),
  email: z
    .string()
    .min(5, "Description must be at least 5 characters")
    .email("Must be a valid email"),
});

type FormValues = z.infer<typeof formSchema>;

const UserProfileModal = ({ onClose }: CreateModalProps) => {
  const { user } = UseUser();
  const [activeTab, setActiveTab] = useState<"security" | "subscriptions">(
    "security"
  );

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: user?.name || "",
      email: user?.email || "",
    },
  });

  const onSubmit = async (data: FormValues) => {
    console.log("Form submitted with data:", data);
  };

  return (
    <main className="mr-4 gap-4">
      {/* Tabs */}
      <div className="flex border-b mb-4">
        <button
          className={`px-4 py-2 font-medium ${
            activeTab === "security"
              ? "border-b-2 border-black dark:border-white font-medium"
              : "text-gray-500"
          }`}
          onClick={() => setActiveTab("security")}
        >
          Security
        </button>
        <button
          className={`px-4 py-2 font-medium ${
            activeTab === "subscriptions"
              ? "border-b-2 border-black dark:border-white font-medium"
              : "text-gray-500"
          }`}
          onClick={() => setActiveTab("subscriptions")}
        >
          Subscriptions
        </button>
      </div>

      {/* Content */}
      {activeTab === "security" && (
        <>
          <div className="flex p-2">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4 flex-1"
              >
                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Username</FormLabel>
                      <FormControl>
                        <div className="flex items-center justify-between gap-2">
                          <Input
                            className="w-full"
                            placeholder="John"
                            {...field}
                          />
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

              <div className="flex items-center pl-10">
                <Image
                  className="rounded-full"
                  alt="User Profile"
                  width={100}
                  height={100}
                  src={user?.image || "/default.png"}
                />
              </div>
            </Form>
          </div>

          <Separator />
          <div className="flex w-full mt-5 gap-2 justify-between">
            <DefaultButton
              isReactive
              className="w-full"
              type="button"
              onClick={HandleSignOut}
            >
              Sign out
            </DefaultButton>

            <DefaultButton
              variant="destructive"
              onClick={() => handleDeleteAccount()}
              isReactive
              className="w-full"
            >
              Delete Account
            </DefaultButton>
          </div>
        </>
      )}

      {activeTab === "subscriptions" && (
        <div className="p-4">
          <h2 className="text-lg font-semibold mb-2">Your Subscriptions</h2>
          <p className="text-gray-600">
            You don't have any active subscriptions.
          </p>
          {/* You can insert actual subscription data here */}
        </div>
      )}
    </main>
  );
};

export default UserProfileModal;
