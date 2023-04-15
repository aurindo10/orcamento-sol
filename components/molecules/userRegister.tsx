"use client";

import { useEffect, useState } from "react";
import { api } from "utils/api";

export function RegisterUser() {
  const { mutateAsync: createUser } = api.user.createUser.useMutation();
  return (
    <div>
      <h1>Register User</h1>
      <button
        onClick={async () => await createUser()}
        className="btn-primary btn"
      >
        Register User
      </button>
    </div>
  );
}
