"use client";

import React from "react";
import Navigation from "@c/effects/direction-tabs";
import ProfileSection from "@c/ProfileSection";
import { useBreadcrumbs } from "@/core/hooks/useBreadcrumbs";
import { Breadcrumbs } from "@/components/theme/breadcrumbs/Breadcrumbs";
import AddressBar from "@/components/theme/breadcrumbs/AddressBar";

const Header: React.FC = () => {
  const breadcrumbItems = useBreadcrumbs();
  return (
    <div className="flex flex-col bg-black border-b border-zinc-800 border-1 ">
      <Navigation />
      <AddressBar />
      <div className="self-center px-6 py-5 max-w-full text-base font-medium  w-[1043px] max-md:px-5">
        <ProfileSection />{" "}
      </div>
    </div>
  );
};

export default Header;
