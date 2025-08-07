"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import UserProfileModal from "./Modals/UserProfileModal";
import { useRoutes } from "../hooks/useRoutes";
import { UseUser } from "../hooks/useUser";


const Navigation_bar = () => {
  const { user } = UseUser();
  const nav_routes = useRoutes();
  const [open, setOpen] = useState(false);

  return (
    <nav className="flex justify-between items-center w-full border-b mb-3">
      <ul className="flex gap-4">
        {nav_routes.map((item) => {
          const isActive = item.active;
          return (
            <li key={item.href}>
              <Link
                href={item.href}
                className={`py-4 block text-lg ${
                  isActive
                    ? "border-b-2 border-black dark:border-white font-medium"
                    : "text-gray-500 hover:text-black dark:hover:text-white"
                }`}
              >
                {item.label}
              </Link>
            </li>
          );
        })}
      </ul>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Image
            className="p-1  rounded-full bg-slate-50"
            src={user?.image || "/profile.png"}
            alt="Profile"
            width={35}
            height={35}
            onClick={() => setOpen(true)}
          />
        </DialogTrigger>

        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Privacy</DialogTitle>
          </DialogHeader>

          <UserProfileModal onClose={() => setOpen(false)} />
        </DialogContent>
      </Dialog>
    </nav>
  );
};

export default Navigation_bar;
