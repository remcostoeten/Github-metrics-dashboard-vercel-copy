'use client'

import React, { useEffect, useState } from "react";
import { Flex } from "./atoms/Flexer";

interface ProjectData {
  name: string;
  html_url: string;
  pushed_at: string;
  updated_at: string;
  full_name: string;
  productionUrl: string;
  latestUrl: string;
  lastDeployedAt: string;
}

interface ProjectCardProps {
  repoName: string;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ repoName }) => {
  const [projectData, setProjectData] = useState<ProjectData | null>(null);

  useEffect(() => {
    const fetchProjectData = async () => {
      try {
        const response = await fetch('/api/github');
        if (!response.ok) {
          throw new Error('Failed to fetch project data');
        }
        const data: ProjectData[] = await response.json();
        const thisProject = data.find(project => project.full_name === repoName);
        if (thisProject) {
          setProjectData(thisProject);
        }
      } catch (error) {
        console.error('Error fetching project data:', error);
      }
    };

    fetchProjectData();
  }, [repoName]);

  if (!projectData) return null;

  const timeSinceLastDeployment = getTimeSince(new Date(projectData.lastDeployedAt));

  return (
    <div className="flex flex-col bg-black rounded-md shadow-lg border border-zinc-800">
      <CardHeader title={projectData.name} />
      <CardBody
        productionUrl={projectData.productionUrl}
        latestUrl={projectData.latestUrl}
        productionTime={new Date(projectData.pushed_at).toLocaleString()}
        latestTime={timeSinceLastDeployment}
      />
      <CardFooter repoName={projectData.full_name} />
    </div>
  );
};

const CardHeader: React.FC<{ title: string }> = ({ title }) => (
  <div className="flex justify-between items-center px-4 py-4">
    <h2 className="text-2xl font-semibold tracking-tight text-white">{title}</h2>
    <button type="button" className="box-border text-[rgb(206,206,206)] text-[14px] leading-[32px] bg-black cursor-pointer block font-normal h-[32px] justify-center min-w-min overflow-hidden pointer-events-auto relative text-center capitalize whitespace-nowrap select-none w-[66.925px] px-[18.4px] py-0 rounded-[5px] border-[0.8px] border-solid border-zinc-800">visit</button>
  </div>
);

interface UrlInfoProps {
  url: string;
  label: string;
  time: string;
}

const UrlInfo: React.FC<UrlInfoProps> = ({ url, label, time }) => (
  <Flex justify="between">
    <div className="flex gap-2 items-center text-sm font-medium text-white">
      <div className="w-2.5 h-2.5 bg-red-300 rounded-full" />
      <a
        href={url}
        className="box-border items-baseline text-white cursor-pointer text-[14px] block h-[16px] leading-[16px] transition-[color] duration-[0.2s] ease-[ease] delay-0 w-[237.637px] bg-[rgba(0,0,0,0)] font-medium overflow-hidden text-ellipsis whitespace-nowrap rounded-none"
      >
        {label}
      </a>
    </div>
    <Flex items="center" gap='4'>
      <span className="box-border text-white text-[12px] font-medium block h-[17.6px] leading-[12px] w-[76.175px] ml-[10.6667px] mr-0 my-0 px-[6px] py-[2px] rounded-[16px] border-[0.8px] border-solid border-[rgb(51,51,51)]">
        Production
      </span>
      <time className="text-stone-500">{time}</time>
    </Flex>
  </Flex>
);

interface CardBodyProps {
  productionUrl: string;
  latestUrl: string;
  productionTime: string;
  latestTime: string;
}

const CardBody: React.FC<CardBodyProps> = ({
  productionUrl,
  latestUrl,
  productionTime,
  latestTime,
}) => (
  <div className="flex flex-col gap-1 px-4 pb-4">
    <UrlInfo url={productionUrl} label="Production" time={productionTime} />
    <UrlInfo url={latestUrl} label="Latest" time={latestTime} />
  </div>
);

const CardFooter: React.FC<{ repoName: string }> = ({ repoName }) => (
  <div className="flex gap-2.5 px-5 py-5 text-sm font-medium text-white border-t border-zinc-800">
    <img
      src="https://cdn.builder.io/api/v1/image/assets/TEMP/3ae15021208b3116cd3e1a84597469fc5f156a851c1d0e45b0e83321d8700e93?apiKey=3cf1db2ab1694ce4be6d4ee2ec473197&"
      className="w-3.5 aspect-square"
      alt=""
    />
    <div>{repoName}</div>
  </div>
);

const getTimeSince = (date: Date): string => {
  const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);
  let interval = seconds / 31536000;
  if (interval > 1) return Math.floor(interval) + "y ago";
  interval = seconds / 2592000;
  if (interval > 1) return Math.floor(interval) + "mo ago";
  interval = seconds / 86400;
  if (interval > 1) return Math.floor(interval) + "d ago";
  interval = seconds / 3600;
  if (interval > 1) return Math.floor(interval) + "h ago";
  interval = seconds / 60;
  if (interval > 1) return Math.floor(interval) + "m ago";
  return Math.floor(seconds) + "s ago";
};

export default ProjectCard;