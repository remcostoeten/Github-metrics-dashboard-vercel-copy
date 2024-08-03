import React from "react";

interface PillProps {
  children: React.ReactNode;
}

const Pill: React.FC<PillProps> = ({ children }) => {
  return (
    <span className="inline-flex items-center gap-x py-.5 px-2 text-[10px] rounded-full font-normal border border-[#333] text-white glass">
      {children}
    </span>
  );
};

export default Pill;
