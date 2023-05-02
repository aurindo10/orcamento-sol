"use client";
import React from "react";
import FullProductPage from "components/templates/FullProductPage";
// import { auth, clerkClient } from "@clerk/nextjs/app-beta";
import { useUser } from "@clerk/nextjs";

export const ProductPage = () => {
  // const { userId } = auth();
  // const isUser = await clerkClient.users.getUser(userId ? userId : "");
  // const user = isUser?.publicMetadata
  //   ? isUser
  //   : { publicMetadata: { worker: false, admin: false, masterAdmin: false } };
  const { user } = useUser();
  if (!user!.publicMetadata.admin)
    return <div className="text-slate-50">Not authorized</div>;
  return <FullProductPage></FullProductPage>;
};
