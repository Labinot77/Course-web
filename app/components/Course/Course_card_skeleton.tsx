import { SkeletonCount } from "@/app/constants/filter";
import { Skeleton } from "@/components/ui/skeleton";


const CourseGridSkeleton = () => (
  <>
    {Array.from({ length: SkeletonCount }).map((_, i) => (
      <Skeleton
        key={i}
        className="w-full h-64 rounded-lg bg-muted"
      />
    ))}
    </>
);

export default CourseGridSkeleton;