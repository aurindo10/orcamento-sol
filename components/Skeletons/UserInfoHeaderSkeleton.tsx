import { UserCircle } from "@phosphor-icons/react";
import { Skeleton } from "components/molecules/skeleton";

export const UserInfoHeaderSkeleton = () => {
  return (
    <div className="container">
      <div className="mt-2 flex  items-center justify-between px-4 py-2 md:justify-center">
        <Skeleton className="h-10 w-48" />
        <div className="text-slate-50">
          <UserCircle size={77} />
        </div>
      </div>
      <div className="min-w-36 mt-6 flex justify-between gap-6 md:justify-center">
        <div className="max-w-40 flex h-32 w-36 flex-col items-center gap-3 rounded-lg bg-slate-600 px-2 py-4">
          <Skeleton className="h-3 w-24 bg-slate-400" />
          <div className="flex w-full items-center justify-around gap-2">
            <Skeleton className="h-12 w-14 bg-slate-400" />
            <Skeleton className="h-12 w-14 bg-slate-400" />
          </div>
          <Skeleton className="h-3 w-24 bg-slate-400" />
        </div>

        <div className="max-w-40 flex h-32 w-36 flex-col items-center gap-3 rounded-lg bg-slate-600 px-2 py-4">
          <Skeleton className="h-3 w-24 bg-slate-400" />
          <div className="flex w-full items-center justify-around gap-2">
            <Skeleton className="h-12 w-14 bg-slate-400" />
            <Skeleton className="h-12 w-14 bg-slate-400" />
          </div>
          <Skeleton className="h-3 w-24 bg-slate-400" />
        </div>
      </div>
    </div>
  );
};
