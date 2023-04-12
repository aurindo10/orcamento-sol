import "../styles/globals.css";

import { ClerkProvider } from "@clerk/nextjs/app-beta";
import React from "react";
import ClientProvider from "../contexts/ClientProvider";
import { api } from "utils/api";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data } = api.example.getAll.useQuery();
  return (
    <ClientProvider>
      <ClerkProvider>
        <html lang="pt-br">
          <head>
            <title>Next.js 13 with Clerk</title>
          </head>
          <body className="w-3 bg-slate-500">{children}</body>
        </html>
      </ClerkProvider>
    </ClientProvider>
  );
}
