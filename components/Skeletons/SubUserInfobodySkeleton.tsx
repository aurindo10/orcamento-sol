import { UserCircle } from "@phosphor-icons/react";
import { Skeleton } from "components/molecules/skeleton";

export const SubUserInfobodySkeleton = () => {
  return (
    <div className="mt-2">
      {[...Array(5)].map((_, index) => {
        return (
          <div className="grid grid-cols-3" key={index}>
            <div className="col-span-2 mt-2 flex items-center gap-2">
              <UserCircle size={45} color="white" />
              <div className="flex flex-col">
                <Skeleton className="h-6 w-32" />
                <Skeleton className="mt-2 h-3 w-40" />
                <Skeleton className="mt-2 h-3 w-32" />
              </div>
            </div>
            <div className="flex items-center justify-end text-center text-[22px] font-bold text-slate-50">
              <Skeleton className="h-6 w-20" />
            </div>
            <div className="col-span-3 mt-2 h-[0.4px] bg-neutral-600"></div>
          </div>
        );
      })}
    </div>
  );
};
