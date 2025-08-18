"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { PenSquare } from "lucide-react";
import { UseFormReturn, FieldValues, Path } from "react-hook-form";
import { useState } from "react";

interface EditFieldModalProps<T extends FieldValues> {
  label: string;
  field: Path<T>;
  type?: "text" | "textarea" | "number";
  form: UseFormReturn<T>;
}

export default function EditFieldModal<T extends FieldValues>({
  label,
  field,
  type = "text",
  form,
}: EditFieldModalProps<T>) {
  const [open, setOpen] = useState(false);
  const [localValue, setLocalValue] = useState(
    form.getValues(field) as string | number | undefined
  );

  const handleSave = () => {
    form.setValue(
      field,
      type === "number" ? Number(localValue) : (localValue as any),
      { shouldDirty: true, shouldValidate: true }
    );
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="icon" variant="ghost">
          <PenSquare className="h-3 w-3" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit {label}</DialogTitle>
        </DialogHeader>

        {type === "textarea" ? (
          <Textarea
            value={localValue as string}
            onChange={(e) => setLocalValue(e.target.value)}
          />
        ) : (
          <Input
            type={type}
            value={localValue as string | number | undefined}
            onChange={(e) => setLocalValue(e.target.value)}
          />
        )}

        <Button onClick={handleSave}>Save</Button>
      </DialogContent>
    </Dialog>
  );
}
