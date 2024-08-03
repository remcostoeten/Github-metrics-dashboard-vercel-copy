import React from 'react';
import { Tooltip, TooltipTrigger, TooltipContent } from '@/components/ui/tooltip';
import Pill from './Pill';


type ProjectData = {
  latestCommit: {
    message: string;
    branch: string;
  }
  }


interface CommitInfoProps {
  commit: ProjectData["latestCommit"];
  time: string;
}

const MAX_CHAR_LIMIT = 40;

const truncateMessage = (message: string, limit: number): string => {
  if (message.length > limit) {
    return `${message.slice(0, limit)}...`;
  }
  return message;
};



function CommitInfo({ commit }: CommitInfoProps) {
return (
    <div className="duration-200 flex items-center gap-2">
      <Tooltip>
        <TooltipTrigger>
          <span>{truncateMessage(commit.message, MAX_CHAR_LIMIT)}</span>
        </TooltipTrigger>
        <TooltipContent 
          className="bg-black border-[#333]"
          side="top"
          align="center"
        >
          {commit.message}
        </TooltipContent>
      </Tooltip>
      <Tooltip>
        <TooltipTrigger>
          <Pill>{commit.branch}</Pill>
        </TooltipTrigger>
        <TooltipContent
          className="bg-black border-[#333]"
          side="top"
          align="center"
        >
          {commit.branch}
        </TooltipContent>
      </Tooltip>
    </div>
  );
};

export default CommitInfo;