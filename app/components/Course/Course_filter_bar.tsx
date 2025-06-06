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

export default function CourseFilterBar() {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex justify-between items-center pt-1 pb-2 pr-0 pl-4 w-full">
      <Input
        type="text"
        placeholder="Search"
        className="h-8 w-[16rem] px-3 rounded-md"
      />

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button onClick={() => setOpen(true)}>Create</Button>
        </DialogTrigger>

        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Create a new course</DialogTitle>
          </DialogHeader>

          {/* Pass the close handler */}
          <CreateModalForm onClose={() => setOpen(false)} />
        </DialogContent>
      </Dialog>
    </div>
  );
}
