import "../styles/globals.css";

import { ClerkProvider } from "@clerk/nextjs/app-beta";
import React from "react";
import ClientProvider from "../contexts/ClientProvider";
import ResponsiveDrawer from "components/molecules/Drawer";

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
            <title>Sol Orçamentos</title>
          </head>
          <body className=" bg-slate-900">
            <ResponsiveDrawer>{children}</ResponsiveDrawer>
          </body>
        </html>
      </ClerkProvider>
    </ClientProvider>
  );
}
