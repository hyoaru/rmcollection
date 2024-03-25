"use client"

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { PanelLeftOpen } from "lucide-react";

// App imports
import { Tables } from "@constants/base/database-types";
import { NavigationType } from "@constants/admin/types";
import { cn } from "@lib/utils";

type AdminSideNavSectionNavigationGroupProps = {
  sectionTitle: string;
  navigations: NavigationType[];
  authenticatedUser: Tables<"users"> | null;
  icon: React.ReactNode;
};

export default function AdminSideNavSectionGroup({
  sectionTitle,
  navigations,
  authenticatedUser,
  icon,
}: AdminSideNavSectionNavigationGroupProps) {
  const pathname = usePathname()
  
  return (
    <>
      <div className="py-5 px-5  xl:pl-8 xl:pr-10 flex flex-row overflow-x-auto rounded-lg sm:flex-col">
        <small className="mb-3 text-primary-foreground text-lg font-bold capitalize hidden sm:flex sm:items-center sm:gap-2">
          <PanelLeftOpen size={20} strokeWidth={2} />
          {sectionTitle}
        </small>
        <div className="flex flex-col gap-2">
          {navigations.map((navigation) => {
            const isPermitted = authenticatedUser
              ? navigation.adminRolesPermitted?.includes(authenticatedUser.role)
              : false;

            const isLinkActive = pathname == navigation.pathName

            if (isPermitted) {
              return (
                <Link
                  key={`SideNavExpandedNavigation-${navigation.name}`}
                  href={navigation.pathName}
                  className={cn(
                    "text-primary-foreground text-sm p-1 px-3 rounded-lg border flex gap-2 items-center hover:bg-secondary hover:text-primary transition-all duration-500 ease-in-out",
                    isLinkActive && "bg-secondary text-primary"
                  )}
                >
                  {icon}
                  {navigation.name}
                </Link>
              );
            }
          })}
        </div>
      </div>
    </>
  );
}
