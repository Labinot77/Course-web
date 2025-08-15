"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import CreateModalForm from "../Modals/CreateModal";
import { DefaultButton } from "../buttons/Buttons";
import Link from "next/link";

export default function CourseFilterBar() {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex justify-between items-center pt-1 pb-2 pr-0 pl-4 w-full">
      <Input
        type="text"
        placeholder="Search"
        className="h-8 w-[16rem] px-3 rounded-md"
      />

      <Link href={"/courses/create"}>
        <DefaultButton isReactive>Create</DefaultButton>
      </Link>
    </div>
  );
}
