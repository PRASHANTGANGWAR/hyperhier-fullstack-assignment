"use client";

import * as React from "react";

import Image from "next/image";

import Logo from "@/assets/logo.png";
import { Sidebar, SidebarContent, SidebarHeader, SidebarRail } from "@/components/ui/sidebar";
import { sidebarItems } from "@/navigation/sidebar/sidebarItems";

import SidebarNavigation from "./sidebarNavigation";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader className="mt-2 p-4">
        <Image src={Logo} alt="App Logo" width={80} height={80} />
      </SidebarHeader>
      <SidebarContent>
        <SidebarNavigation sidebarItems={sidebarItems} />
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
