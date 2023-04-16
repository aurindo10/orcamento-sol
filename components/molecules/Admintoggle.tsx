"use client";

import { useEffect, useState } from "react";
import { api } from "utils/api";

interface AdminToggleProps {
  user: {
    userId: string;
    name: string;
    isWorker: boolean;
  };
}
export function AdminToggle({ user }: AdminToggleProps) {
  const [isWorker, setIsWorker] = useState(false);
  const { mutateAsync: turnUserIntoWorker } =
    api.user.turnUserIntoWorker.useMutation();
  async function handleToggleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const isChecked = e.target.checked;
    setIsWorker(isChecked);
    await turnUserIntoWorker({
      userId: user.userId,
      isWorker: isChecked,
    });
  }
  useEffect(() => {
    setIsWorker(user.isWorker);
  }, [user.isWorker]);
  return (
    <div
      className="max-w-80 h-18 card  flex w-full justify-between bg-neutral py-2 text-neutral-content"
      key={user.userId}
    >
      <div className="flex justify-around">
        <label className="card-title">{user.name}</label>
        <label className="label cursor-pointer ">
          <input
            type="checkbox"
            className="toggle"
            checked={isWorker}
            onChange={handleToggleChange}
          />
        </label>
      </div>
    </div>
  );
}
