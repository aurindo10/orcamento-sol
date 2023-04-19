import React from "react";
import FullProductPage from "components/templates/FullProductPage";
import { auth, clerkClient } from "@clerk/nextjs/app-beta";

export default async function Page() {
  const { userId } = auth();
  const isUser = await clerkClient.users.getUser(userId ? userId : "");
  const user = isUser?.publicMetadata
    ? isUser
    : { publicMetadata: { worker: false, admin: false, masterAdmin: false } };
  if (!user.publicMetadata.admin) return <div>Not authorized</div>;
  return <FullProductPage></FullProductPage>;
}
