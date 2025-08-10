import React from "react";
import { SidebarComponent } from "./sidebar";
import { cn } from "@/lib/utils";

interface LayoutProps {
  children: React.ReactNode;
}

export const Layouts = ({ children }: LayoutProps) => {
  return (
    <div
      className={cn(
        "mx-auto flex w-full max-w-full flex-1 flex-col overflow-hidden rounded-md bg-gray-100 md:flex-row dark:bg-neutral-800",
        "h-screen" // Diubah menjadi h-screen untuk penggunaan aplikasi full-screen
      )}
    >
      <SidebarComponent />
      {children}
    </div>
  );
};
