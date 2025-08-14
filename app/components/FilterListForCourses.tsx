"use client";

import { use, useState } from "react";
import { Categories, Price } from "@/app/constants/filter";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";

const Filter_list = () => {
  const [selectedPrice, setSelectedPrice] = useState<string | null>(null);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const handlePriceChange = (value: string) => {
    setSelectedPrice((prev) => (prev === value ? null : value));
  };

  const handleCategoryChange = (value: string) => {
    setSelectedCategories((prev) =>
      prev.includes(value)
        ? prev.filter((cat) => cat !== value)
        : [...prev, value]
    );
  };

  const isPaidChecked = selectedPrice === "paid";

  return (
    <main className="w-[19rem] bg-primary-foreground rounded-md h-min p-4 space-y-2">
      <div>
        <h1 className="text-lg font-semibold mb-2">Price</h1>
        {Price.map((price) => (
          <div
            key={price.value}
            className="flex items-center space-x-2 hover:bg-secondary p-2 rounded-md"
          >
            <Checkbox
              id={price.value}
              checked={selectedPrice === price.value}
              onCheckedChange={() => handlePriceChange(price.value)}
            />
            <Label htmlFor={price.value}>{price.label}</Label>
          </div>
        ))}

        {isPaidChecked && (
          <div className="space-y-4">
            <div>
              <Label className="text-sm">Duration (hours)</Label>
              <div className="flex space-x-2">
                <Input type="number" placeholder="Min" className="w-full" />
                <Input type="number" placeholder="Max" className="w-full" />
              </div>
            </div>

            <div>
              <Label className="text-sm">Price Range ($)</Label>
              <div className="flex space-x-2">
                <Input type="number" placeholder="Min" className="w-full" />
                <Input type="number" placeholder="Max" className="w-full" />
              </div>
            </div>
          </div>
        )}
        <Separator className="my-2" />
      </div>

      <div>
        <h1 className="text-lg font-semibold mb-2">Categories</h1>
        <Input type="text" placeholder="Placeholder" className="w-[98%]" />
        <ScrollArea className="h-48 py-2">
          {Categories.map((category) => (
            <div
              key={category.value}
              className="flex items-center space-x-2 hover:bg-secondary p-2 rounded-md"
            >
              <Checkbox
                id={category.value}
                checked={selectedCategories.includes(category.value)}
                onCheckedChange={() => handleCategoryChange(category.value)}
              />
              <Label htmlFor={category.value}>{category.label}</Label>
            </div>
          ))}
        </ScrollArea>
        <Separator className="my-2" />
      </div>

      {/* Verified Users  */}


    </main>
  );
};

export default Filter_list;
