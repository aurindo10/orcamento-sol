"use client";
import { useUser } from "@clerk/nextjs";
// import { auth, clerkClient } from "@clerk/nextjs/app-beta";
import { OrcamentoForm } from "components/templates/OrcamentoForm";

export default function Page() {
  // const { userId } = auth();
  // const isUser = await clerkClient.users.getUser(userId ? userId : "");
  // const user = isUser?.publicMetadata
  //   ? isUser
  //   : { publicMetadata: { worker: false, admin: false, masterAdmin: false } };
  const { user, isLoaded } = useUser();

  if (!isLoaded) {
    return <div className="text-slate-50">loading</div>;
  }
  if (!user!.publicMetadata.worker) return <div>Not authorized</div>;
  return <OrcamentoForm></OrcamentoForm>;
}
