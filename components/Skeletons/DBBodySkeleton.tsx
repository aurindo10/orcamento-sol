import { UserCircle } from "@phosphor-icons/react";
import { Skeleton } from "components/molecules/skeleton";

export const DashboardbodySkeleton = () => {
  return (
    <div className="py-4">
      <Skeleton className="mb-4 h-8 w-48 " />
      <div className="mt-4 space-y-2">
        {[...Array(5)].map((_, index) => {
          return (
            <div className="user flex justify-between" key={index}>
              <div className="flex">
                <UserCircle size={55} color="white" />
                <div className="ml-2">
                  <Skeleton className="h-6 w-36" />
                  <Skeleton className="mt-2 h-2 w-48" />
                </div>
              </div>
              <div className="mr-2 flex flex-col items-center">
                <Skeleton className="h-9 w-9 rounded-full" />
                <Skeleton className="mt-2 h-3 w-16" />
              </div>
            </div>
          );
        })}
        <div className="h-[0.2px] w-full bg-neutral-600"></div>
      </div>
    </div>
  );
};
