/* eslint-disable tailwindcss/no-arbitrary-value */
import React, { ReactNode } from "react";

import { Folder } from "lucide-react";

import { AppSidebar } from "@/components/sidebar/app-sidebar";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList } from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

interface BreadcrumbItem {
  name: string;
  href: string;
}

interface DefaultLayoutProps {
  children: ReactNode;
  breadcrumbItems: BreadcrumbItem[];
}

const DefaultLayout = ({ children, breadcrumbItems }: DefaultLayoutProps) => {
  return (
    <main>
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset className="mx-auto max-w-screen-2xl">
          <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
            <div className="flex items-center gap-2 px-4">
              <SidebarTrigger className="hidden max-md:block" />
              <Separator orientation="vertical" className="mr-2 h-4" />
              <Breadcrumb>
                <BreadcrumbList>
                  {breadcrumbItems.map((item, index) => (
                    <BreadcrumbItem key={index}>
                      <BreadcrumbLink href={item.href} className="flex flex-row items-center gap-2">
                        <Folder size={20} /> / {item.name}
                      </BreadcrumbLink>
                    </BreadcrumbItem>
                  ))}
                </BreadcrumbList>
              </Breadcrumb>
            </div>
          </header>
          <div className="p-4 pt-0">{children}</div>
        </SidebarInset>
      </SidebarProvider>
    </main>
  );
};

export default DefaultLayout;
