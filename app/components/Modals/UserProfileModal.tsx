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
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { postRequest } from "@/app/lib/api/Post";
import { handleSignOut } from "@/app/lib/Auth";
import { toast } from "sonner";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { DefaultButton } from "../buttons/Buttons";

interface CreateModalProps {
  onClose: () => void;
}

const HandleSignOut = async () => {
  toast.success("You have been signed out successfully.");
  await handleSignOut();
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
  const { data: session } = useSession();
  const user = session?.user;
  const router = useRouter();
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
    <main className="mr-4 flex gap-4">
      <div className="w-2/3 h-max p-2  rounded-md">
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
                      {/* <Button onClick={() => onLogout()} variant={"destructive"}>
                    Logout
                  </Button> */}
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
                      {/* {user?.emailVerified ? (
                    <Button type="button" disabled>
                      Verified
                    </Button>
                  ) : (
                    <Button type="button">Verify</Button>
                  )} */}
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
      </div>

      <div className="flex flex-col items-center justify-center w-1/3 h-max p-2 rounded-md">
        <Image
          className="rounded-full"
          alt="User Profile"
          width={100}
          height={100}
          src={user?.image || "/default.png"}
        />

        <DefaultButton type="button" onClick={() => HandleSignOut()}>
          Sign out{" "}
        </DefaultButton>
      </div>
    </main>
    // <Form {...form}>
    //   <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
    //     <FormField
    //       control={form.control}
    //       name="username"
    //       render={({ field }) => (
    //         <FormItem>
    //           <FormLabel>Username</FormLabel>
    //           <FormControl>
    //             <div className="flex items-center justify-between gap-2">
    //               <Input className="w-full" placeholder="John" {...field} />
    //               {/* <Button onClick={() => onLogout()} variant={"destructive"}>
    //                 Logout
    //               </Button> */}
    //             </div>
    //           </FormControl>
    //           <FormMessage />
    //         </FormItem>
    //       )}
    //     />

    //     <FormField
    //       control={form.control}
    //       name="email"
    //       render={({ field }) => (
    //         <FormItem className="flex-1 w-full">
    //           <FormLabel>Email</FormLabel>
    //             <FormControl>
    //             <div className="flex items-center gap-2">
    //               <Input
    //                 className="w-full"
    //                 placeholder="John@joe.dho"
    //                 {...field}
    //               />
    //               {/* {user?.emailVerified ? (
    //                 <Button type="button" disabled>
    //                   Verified
    //                 </Button>
    //               ) : (
    //                 <Button type="button">Verify</Button>
    //               )} */}
    //             </div>
    //           </FormControl>
    //           <FormMessage />
    //         </FormItem>
    //       )}
    //     />

    //   </form>
    // </Form>
  );
};

export default UserProfileModal;
