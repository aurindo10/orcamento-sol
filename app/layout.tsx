import "../styles/globals.css";

import { ClerkProvider } from "@clerk/nextjs/app-beta";
import React from "react";
import ClientProvider from "../contexts/ClientProvider";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClientProvider>
      <ClerkProvider>
        <html lang="pt-br">
          <head>
            <title>Next.js 13 with Clerk</title>
          </head>
          <body>{children}</body>
        </html>
      </ClerkProvider>
    </ClientProvider>
  );
}