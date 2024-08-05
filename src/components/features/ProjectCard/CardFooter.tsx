import { GithubLogo } from "@/components/icons";
import { Button } from "@c/ui";
import React from "react";
import Link from "next/link";

interface CardFooterProps {
  repoName: string;
}

const CardFooter: React.FC<CardFooterProps> = ({ repoName }) => {
  const repoUrl = `https://github.com/${repoName}`;

  return (
    <div className="flex justify-between items-center gap-2.5 px-5 py-5 text-sm font-medium text-white border-t border-zinc800">
      <Link
        href={repoUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2.5 hover:underline"
      >
        <GithubLogo />
        <div className="max-w-[95%] overflow-hidden text-ellipsis whitespace-nowrap">
          <p>{repoName}</p>
        </div>
      </Link>
      <Link href={repoUrl} target="_blank" rel="noopener noreferrer">
        <Button
          variant="gooeyLeft"
          type="button"
          className="text-white text-sm leading-8 bg-black cursor-pointer font-normal min-w-min text-center whitespace-nowrap py-4 px-8 rounded border-[0.8px] border-solid border-zinc-800"
        >
          visit
        </Button>
      </Link>
    </div>
  );
};

export default CardFooter;
