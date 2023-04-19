"use client";

import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import { api } from "utils/api";

interface AdminToggleProps {
  user: {
    userId: string;
    name: string;
  };
}
export function AdminToggle({ user }: AdminToggleProps) {
  const { mutateAsync: turnUserIntoWorker } =
    api.user.turnUserIntoWorker.useMutation();
  async function handleToggleChange() {
    const userUpdated = await turnUserIntoWorker({
      id: user.userId,
    });
  }
  return (
    <div
      className="max-w-80 h-18 card  flex w-full justify-between bg-neutral py-2 text-neutral-content"
      key={user?.userId}
    >
      <div className="flex justify-around">
        <label className="card-title">{user?.name}</label>
        <label className="label cursor-pointer ">
          <button
            className="btn-primary btn"
            onClick={() => handleToggleChange()}
          />
        </label>
      </div>
    </div>
  );
}
