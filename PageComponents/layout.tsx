import "../styles/globals.css";
import ClientProvider from "../contexts/ClientProvider";
import { ClerkProvider, auth } from "@clerk/nextjs/app-beta";
import ResponsiveDrawer from "components/molecules/Drawer";
import React from "react";

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
          <body className="h-full min-h-screen bg-slate-900">
            <div className=" py-8 md:py-12">{children}</div>
          </body>
        </html>
      </ClerkProvider>
    </ClientProvider>
  );
}
