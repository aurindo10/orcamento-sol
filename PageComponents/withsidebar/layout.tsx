"use client";
import ResponsiveDrawer from "components/molecules/Drawer";
import React from "react";

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <ResponsiveDrawer>
        <div className="py-8 md:py-12">{children}</div>
      </ResponsiveDrawer>
    </div>
  );
}
