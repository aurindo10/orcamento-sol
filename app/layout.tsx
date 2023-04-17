import "../styles/globals.css";
import ClientProvider from "../contexts/ClientProvider";
import { ClerkProvider, auth } from "@clerk/nextjs/app-beta";
import ResponsiveDrawer from "components/molecules/Drawer";
import React, { Suspense } from "react";

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
            <Suspense
              fallback={
                <h1 className="font-cabin font-bold text-slate-50">
                  Carregando...
                </h1>
              }
            >
              <div className="bg-slate-900 py-8 md:py-12">{children}</div>
            </Suspense>
          </body>
        </html>
      </ClerkProvider>
    </ClientProvider>
  );
}
