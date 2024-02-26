"use client";

import React from "react";
import Link from "next/link";
import { ShoppingCart, User, Lock, ChevronDown, Search } from "lucide-react";

// App imports
import { DropdownMenu, DropdownMenuTrigger } from "@components/ui/dropdown-menu";
import { Button } from "@components/ui/button";
import MainNavEndUserDropdownContent from "./MainNavEndUserDropdownContent";
import MainNavEndCartDropdownContent from "./MainNavEndCartDropdownContent";
import { Tables } from "@constants/base/database-types";

type MainNavEndProps = {
  authenticatedUser: Tables<"users"> | null;
};

export default function MainNavEnd({ authenticatedUser }: MainNavEndProps) {
  return (
    <>
      <div id="main-nav-end" className="flex justify-end items-center w-1/6 md:w-2/6 xl:w-1/3">
        <div id="main-nav-end-expanded" className="hidden lg:flex items-center">
          <Link href={"/collection/search"} className="">
            <Button variant={"link"} className={"flex gap-x-2 items-center px-3 text-sm md:px-2"}>
              <Search size={20} />
              Search
            </Button>
          </Link>

          {authenticatedUser ? (
            <>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant={"link"} className={"relative px-3 h-max md:px-2"}>
                    <div className="flex items-center gap-x-2">
                      <ShoppingCart size={20} />
                      Cart
                    </div>
                    <div className="absolute bg-primary text-primary-foreground px-1 rounded-full right-0 top-0 text-[9px]">
                      {/* {cart?.data?.length} */}
                    </div>
                  </Button>
                </DropdownMenuTrigger>
                <MainNavEndCartDropdownContent
                  authenticatedUser={authenticatedUser}
                  // cart={cart}
                />
              </DropdownMenu>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <div className="p-2 text-sm cursor-pointer flex items-center gap-x-2">
                    <User size={20} />
                    <span className="font-bold flex items-center capitalize">
                      {authenticatedUser.first_name} <ChevronDown size={20} />
                    </span>
                  </div>
                </DropdownMenuTrigger>
                <MainNavEndUserDropdownContent authenticatedUser={authenticatedUser} />
              </DropdownMenu>
            </>
          ) : (
            <>
              <Button variant={"link"} className={"px-3"}>
                <Link href={"/auth/sign-in"} className="">
                  Login
                </Link>
              </Button>
            </>
          )}
        </div>

        <div id="main-nav-end-collapsed" className="flex lg:hidden">
          {authenticatedUser ? (
            <>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant={"ghost"} className={"p-1 relative sm:p-3"}>
                    <ShoppingCart size={20} />
                    <div className="absolute bg-primary text-primary-foreground px-1 rounded-full right-0 top-0 text-[9px]">
                      {/* {cart?.data?.length} */}
                    </div>
                  </Button>
                </DropdownMenuTrigger>
                <MainNavEndCartDropdownContent
                  authenticatedUser={authenticatedUser}
                  // cart={cart}
                />
              </DropdownMenu>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant={"ghost"} className={"p-1 sm:p-3"}>
                    <span>
                      <User size={20} />
                    </span>
                  </Button>
                </DropdownMenuTrigger>
                <MainNavEndUserDropdownContent authenticatedUser={authenticatedUser} />
              </DropdownMenu>
            </>
          ) : (
            <>
              <Button variant={"ghost"} className={"p-1 sm:p-3"}>
                <Link href={"/auth/sign-in"}>
                  <User size={20} />
                </Link>
              </Button>
            </>
          )}
        </div>
      </div>
    </>
  );
}
