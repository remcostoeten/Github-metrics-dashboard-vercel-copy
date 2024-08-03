import React from "react";
import { ProjectData } from "@/types";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import Pill from "./Pill";

interface CommitInfoProps {
  commit: ProjectData["latestCommit"];
  time: string;
}

const CommitInfo: React.FC<CommitInfoProps> = ({ commit, time }) => (
  <div className="flex justify-between items-center">
    <div className="flex gap-2 items-center text-sm font-medium text-white">
      <div className="space-x-2 space-y-2 w-2.5 h-2.5 bg-green-300 rounded-full translate-y-[3px]" />
      <span className="text-white cursor-pointer text-sm h-4 leading-4 transition-colors duration-200 w-[237.637px] text-ellipsis whitespace-nowrap flex items-center gap-2">
        {commit.message}
        <Tooltip>
          <TooltipTrigger>
            <Pill>{commit.branch}</Pill>
          </TooltipTrigger>
          <TooltipContent
            className="bg-black border-[#333]"
            side="top"
            align="center"
          >
            {" "}
            The git branch for this commit
          </TooltipContent>
        </Tooltip>
      </span>
    </div>
    <div className="flex items-center gap-4">
      <time className="text-xs text-stone-500">{time}</time>
    </div>
  </div>
);

export default CommitInfo;
