import { Skeleton } from "components/molecules/skeleton";

export const FullProductPageSkeleton = () => {
  return (
    <div>
      <div className="px-2 md:px-4">
        <div className="flex w-full flex-col items-center justify-center gap-4">
          <div className="createBUtton flex w-full max-w-lg  justify-end">
            <Skeleton className="h-8 w-32" />
          </div>
          <div className="flex w-full max-w-lg">
            <Skeleton className="h-8 w-full" />
          </div>
          <div className="tableContainer w-full max-w-lg rounded-lg bg-slate-200">
            <div className="tableHeader flex h-12 items-center">
              <Skeleton className="mx-auto h-6 w-32" />
              <Skeleton className="mx-auto h-6 w-32" />
            </div>
            <div className="tableBody w-full space-y-0">
              {[...Array(5)].map((_, index) => {
                const rowBgColor =
                  index % 2 === 0 ? "bg-slate-300" : "bg-slate-100";
                return (
                  <div
                    className={`tableRow flex items-center py-2 ${rowBgColor}`}
                    key={index}
                  >
                    <div className="info flex w-1/2 flex-col justify-center pl-2">
                      <Skeleton className="mb-1 h-4 w-24" />
                      <Skeleton className="h-3 w-32" />
                      <Skeleton className="mt-1 h-3 w-40" />
                      <Skeleton className="mt-1 h-3 w-32" />
                      <Skeleton className="mt-1 h-3 w-32" />
                    </div>
                    <div className="valorContainer flex w-1/2 flex-col items-center">
                      <Skeleton className="h-4 w-24" />
                    </div>
                  </div>
                );
              })}
            </div>
            <Skeleton className="h-12 w-full" />
          </div>
        </div>
      </div>
    </div>
  );
};
