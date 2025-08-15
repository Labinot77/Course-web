export const Categories = [
  { value: "web-development", label: "Web Development" },
  { value: "data-science", label: "Data Science" },
  { value: "design", label: "Design" },
  { value: "marketing", label: "Marketing" },
  { value: "business", label: "Business" },
  { value: "other", label: "Other" },
];

export const Price = [
    { value: true, label: "Free" },
    { value: false, label: "Paid" },
]

export const Duration = [
    { value: "short", label: "Short (less than 1 hour)" },
    { value: "medium", label: "Medium (1-3 hours)" },
    { value: "long", label: "Long (more than 3 hours)" },
];  

export const SkeletonCount = 4;

export const wait = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

