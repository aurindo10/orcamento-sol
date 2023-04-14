import "../styles/globals.css";
import ClientProvider from "../contexts/ClientProvider";
// import { ClerkProvider } from "@clerk/nextjs/app-beta";
import ResponsiveDrawer from "components/molecules/Drawer";
import React from "react";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClientProvider>
      {/* <ClerkProvider> */}
      <html lang="pt-br">
        <head>
          <title>Sol Orçamentos</title>
        </head>
        <body className="h-screen bg-slate-800">
          <ResponsiveDrawer></ResponsiveDrawer>
          {children}
        </body>
      </html>
      {/* </ClerkProvider> */}
    </ClientProvider>
  );
}
