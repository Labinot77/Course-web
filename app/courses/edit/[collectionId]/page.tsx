"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PlusCircle, Save, Trash2, Pencil } from "lucide-react";
import { useCollections } from "@/app/hooks/useCollections";
import { useCourse } from "@/app/hooks/useCourse";

export default function EditCoursePage() {
  const { collectionId } = useCollections();
  const { course, loading } = useCourse(`/api/course/get/${collectionId}`);

return (
  <div>
    adsd
  {/* Episodes */}
    </div>
  );
}
