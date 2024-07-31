#!/bin/bash

# Create the ProjectCard directory
mkdir -p src/components/ProjectCard src/hooks

# Create and populate index.tsx
cat << 'EOF' > src/components/ProjectCard/index.tsx
"use client";

import React from "react";
import { motion } from "framer-motion";
import { ProjectCardProps, ProjectData } from "@/types";
import { LoadingSkeleton } from "../effects/skeleton";
import { useIncrementingTime } from "@/core/hooks/useIncrementingTime";
import { useRepoStore } from "@/core/store/repoStore";
import { useProjectData } from "@/hooks/useProjectData";
import CardHeader from "./CardHeader";
import CardBody from "./CardBody";
import CardFooter from "./CardFooter";

export default function ProjectCard({ repoName }: ProjectCardProps) {
  const { projectData, isPending } = useProjectData(repoName);
  const { removeRepo } = useRepoStore();

  const timeSinceLastCommit = useIncrementingTime(
    projectData?.latestCommit.date,
  );
  const timeSinceDeployment = useIncrementingTime(projectData?.pushed_at);

  if (isPending || !projectData) return <LoadingSkeleton />;

  return (
    <div className="relative flex flex-col bg-black rounded-md shadow-lg border border-zinc-800 group">
      <div className="relative z-10">
        <CardHeader 
          href={projectData.url} 
          title={projectData.name} 
          onRemove={() => removeRepo(repoName)}
        />
        <CardBody
          productionUrl={projectData.productionUrl}
          latestCommit={projectData.latestCommit}
          productionTime={timeSinceDeployment}
          latestTime={timeSinceLastCommit}
        />
        <CardFooter 
          repoName={projectData.full_name} 
        />
      </div>
      <motion.div className="pointer-events-none absolute -inset-px rounded-md opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
    </div>
  );
}
EOF

# Create and populate CardHeader.tsx
cat << 'EOF' > src/components/ProjectCard/CardHeader.tsx
import React from "react";
import Link from "next/link";

interface CardHeaderProps {
  href: string;
  title: string;
  onRemove: () => void;
}

const CardHeader: React.FC<CardHeaderProps> = ({ href, title, onRemove }) => (
  <Link
    href={href}
    target="_blank"
    className="flex justify-between items-center px-4 py-4 gap-2"
  >
    <h2 className="text-2xl font-semibold tracking-tight text-white">
      {title}
    </h2>
    <button
      onClick={(e) => {
        e.preventDefault();
        onRemove();
      }}
      className="text-red-500 hover:text-red-700"
    >
      Remove
    </button>
  </Link>
);

export default CardHeader;
EOF

# Create and populate CardBody.tsx
cat << 'EOF' > src/components/ProjectCard/CardBody.tsx
import React from "react";
import { CardBodyProps } from "@/types";
import UrlInfo from "./UrlInfo";
import CommitInfo from "./CommitInfo";

const CardBody: React.FC<CardBodyProps> = ({
  productionUrl,
  latestCommit,
  productionTime,
  latestTime,
}) => (
  <div className="flex flex-col gap-2 px-4 pb-4">
    <UrlInfo
      url={productionUrl}
      label="Latest deployment"
      time={productionTime}
    />
    <CommitInfo commit={latestCommit} time={latestTime} />
  </div>
);

export default CardBody;
EOF

# Create and populate CardFooter.tsx
cat << 'EOF' > src/components/ProjectCard/CardFooter.tsx
import React from "react";
import { Button } from "../ui/button";
import GithubLogo from "./GithubLogo";

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
EOF

# Create and populate UrlInfo.tsx
cat << 'EOF' > src/components/ProjectCard/UrlInfo.tsx
import React from "react";
import { UrlInfoProps } from "@/types";
import Pill from "./Pill";

const UrlInfo: React.FC<UrlInfoProps> = ({ url, label, time }) => (
  <div className="flex justify-between items-center">
    <div className="flex gap-2 items-center text-sm font-medium text-white">
      <div className="w-2.5 h-2.5 bg-green-300 rounded-full animate-pulse flex items-center gap-2 translate-y-[1px]" />
      
        href={url}
        className="text-white cursor-pointer text-sm h-4 leading-4 transition-colors duration-200 w-[237.637px] text-ellipsis whitespace-nowrap"
      >
        {label}
        <Pill>Production</Pill>
      </a>
    </div>
    <div className="flex items-center gap-4">
      <time className="text-xs text-stone-500">{time}</time>
    </div>
  </div>
);

export default UrlInfo;
EOF

# Create and populate CommitInfo.tsx
cat << 'EOF' > src/components/ProjectCard/CommitInfo.tsx
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
EOF

# Create and populate Pill.tsx
cat << 'EOF' > src/components/ProjectCard/Pill.tsx
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
EOF

# Create and populate GithubLogo.tsx
cat << 'EOF' > src/components/ProjectCard/GithubLogo.tsx
import React from "react";

const GithubLogo: React.FC = () => {
  return (
    <svg
      className="w-3.5 aspect-square"
      width="15"
      height="15"
      viewBox="0 0 15 15"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#clip0_1_93)">
        <path
          d="M6.06673 11.5903C3.15007 12.4653 3.15007 10.132 1.9834 9.84034M10.1501 13.3403V11.0828C10.1719 10.8047 10.1344 10.5251 10.0398 10.2625C9.94528 10 9.79594 9.76067 9.60173 9.56034C11.4334 9.35617 13.3584 8.662 13.3584 5.477C13.3582 4.66257 13.045 3.87937 12.4834 3.2895C12.7493 2.57697 12.7305 1.78937 12.4309 1.09034C12.4309 1.09034 11.7426 0.88617 10.1501 1.95367C8.81307 1.59132 7.40373 1.59132 6.06673 1.95367C4.47423 0.88617 3.7859 1.09034 3.7859 1.09034C3.48628 1.78937 3.46748 2.57697 3.7334 3.2895C3.16764 3.88374 2.85404 4.67402 2.8584 5.4945C2.8584 8.65617 4.7834 9.35034 6.61506 9.57784C6.42315 9.77615 6.27514 10.0127 6.18066 10.272C6.08619 10.5313 6.04737 10.8075 6.06673 11.0828V13.3403"
          stroke="white"
          strokeWidth="1.16667"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      <defs>
        <clipPath id="clip0_1_93">
          <rect
            width="14"
            height="14"
            fill="white"
            transform="translate(0.816711 0.507019)"
          />
        </clipPath>
      </defs>
    </svg>
  );
};

export default GithubLogo;
EOF

# Create and populate useProjectData.ts
cat << 'EOF' > src/hooks/useProjectData.ts
import { useState, useCallback, useEffect, useTransition } from 'react';
import { getRepoData } from '@/server/actions/getRepoData';
import { ProjectData } from '@/types';

export const useProjectData = (repoName: string) => {
  const [projectData, setProjectData] = useState<ProjectData | null>(null);
  const [isPending, startTransition] = useTransition();

  const fetchData = useCallback(async () => {
    startTransition(async () => {
      try {
        const data = await getRepoData(repoName);
        setProjectData(data);
      } catch (error) {
        console.error("Error fetching repo data:", error);
      }
    });
  }, [repoName]);

  useEffect(() => {
    fetchData();
    const pollInterval = setInterval(fetchData, 30000);
    return () => clearInterval(pollInterval);
  }, [fetchData]);

  return { projectData, isPending };
};
EOF

echo "Project structure reorganized and files populated successfully!"