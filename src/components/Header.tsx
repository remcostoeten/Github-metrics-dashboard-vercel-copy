import React from "react";
import ProfileSection from "./ProfileSection";
import Navigation from "./effects/direction-tabs";

const Header: React.FC = () => {
  return (
    <div className="flex flex-col bg-dark border-b border-zinc-800 border-1 ">
      <Navigation />

      <div className="self-center px-6 py-5 max-w-full text-base font-medium  w-[1043px] max-md:px-5">
        <ProfileSection />{" "}
      </div>
    </div>
  );
};

export default Header;
