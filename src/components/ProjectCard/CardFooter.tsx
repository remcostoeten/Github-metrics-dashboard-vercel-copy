import React from "react";
import { Button } from "../ui/button";
import { GithubLogo } from "../icons";

interface CardFooterProps {
  repoName: string;
}

const CardFooter: React.FC<CardFooterProps> = ({ repoName }) => (
  <div className="flex justify-between items-center gap-2.5 px-5 py-5 text-sm font-medium text-white border-t border-zinc-800">
    <div className="flex items-center gap-2.5">
      <GithubLogo />
      <div>{repoName}</div>
    </div>
    <Button
      variant="gooeyLeft"
      type="button"
      className="text-white text-sm leading-8 bg-black cursor-pointer font-normal min-w-min text-center whitespace-nowrap py-4 px-8 rounded border-[0.8px] border-solid border-zinc-800"
    >
      visit
    </Button>
  </div>
);

export default CardFooter;
