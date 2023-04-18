import { currentUser } from "@clerk/nextjs/app-beta";
import {
  ClerkLoaded,
  ClerkLoading,
  SignIn,
} from "@clerk/nextjs/app-beta/client";
import { redirect } from "next/navigation";

export default async function Page() {
  return (
    <div>
      <div className="flex min-h-screen flex-col-reverse items-center justify-center gap-4 lg:flex-row-reverse">
        <ClerkLoaded>
          <SignIn
            redirectUrl={
              process.env.VERCEL_URL
                ? `https://${process.env.VERCEL_URL}` // SSR should use vercel url
                : `http://localhost:${process.env.PORT ?? 3000}`
            }
            afterSignInUrl={
              process.env.VERCEL_URL
                ? `https://${process.env.VERCEL_URL}` // SSR should use vercel url
                : `http://localhost:${process.env.PORT ?? 3000}`
            }
          />
        </ClerkLoaded>
        <ClerkLoading>
          <div
            role="status"
            className="flex h-[400px] w-full max-w-sm animate-pulse items-center justify-center rounded-lg bg-gray-300 dark:bg-gray-700"
          >
            <span className="invisible">Loading...</span>
            <span className="sr-only">Loading...</span>
          </div>
        </ClerkLoading>
        <div className="text-center lg:text-left">
          {/* <h1 className="text-5xl font-bold">Entre</h1> */}
        </div>
      </div>
    </div>
  );
}
