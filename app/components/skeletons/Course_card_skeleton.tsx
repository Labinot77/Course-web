import { SkeletonCount } from "@/app/constants/filter";
import { Skeleton } from "@/components/ui/skeleton";

const CourseGridSkeleton = () => (
  <>
    {Array.from({ length: SkeletonCount }).map((_, i) => (
      <Skeleton key={i} className="w-full h-max rounded-lg bg-muted pb-2">
        <div className="p-2">
        <Skeleton className="h-[30vh] rounded-lg" />

        </div>
        <div className="flex gap-3 mt-2">
          <div className="ml-2 justify-start items-center">
            <Skeleton className="h-10 w-10 rounded-full" />
          </div>

          <div className="flex flex-col gap-2 w-full">
            <Skeleton className="w-[80%] h-4" />
            <Skeleton className="w-[50%] h-4" />

            <div className="flex justify-between">
              <ul className="flex gap-2 text-sm text-muted-foreground">
                <Skeleton className="w-10 h-3" />
                <Skeleton className="w-10 h-3" />
              </ul>

              <Skeleton className="mr-4 h-4 w-8"/>
            </div>
          </div>
        </div>
      </Skeleton>
    ))}
  </>
);

export default CourseGridSkeleton;
