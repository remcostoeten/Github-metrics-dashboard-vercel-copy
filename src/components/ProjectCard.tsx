'use client'

import React, { useEffect, useState } from "react";
import { Flex } from "./atoms/Flexer";
import { getTimeSince } from "@/lib/utils";
import { ProjectCardProps, ProjectData, UrlInfoProps, CardBodyProps } from "@/types";
import { LoadingSkeleton } from "./effects/skeleton";
import { Button } from "./ui/button";
import Link from "next/link";

const ProjectCard: React.FC<ProjectCardProps> = ({ repoName, url }) => {
  const [projectData, setProjectData] = useState<ProjectData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProjectData = async () => {
      try {
        const response = await fetch('/api/github');
        if (!response.ok) {
          throw new Error('Failed to fetch project data');
        }
        const data: ProjectData[] = await response.json();
        const thisProject = data.find(project => project.full_name === repoName);
        setProjectData(thisProject || null);
      } catch (error) {
        console.error('Error fetching project data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProjectData();
  }, [repoName]);

  if (isLoading) return <LoadingSkeleton />;
  if (!projectData) return null;

  const timeSinceLastDeployment = getTimeSince(new Date(projectData.lastDeployedAt));

  return (
    <div className="flex flex-col bg-black rounded-md shadow-lg border border-zinc-800">
      <CardHeader href={projectData.url} title={projectData.name} />
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

const CardHeader: React.FC<{ title: string, href: string }> = ({ href, title }) => (
  <Link href={href} target='_blank' className="flex justify-between items-center px-4 py-4">
    <h2 className="text-2xl font-semibold tracking-tight text-white">{title}</h2>
    <Button variant='gooeyLeft' type="button" className="text-[#cecece] text-sm leading-8 bg-black cursor-pointer font-normal h-8 min-w-min overflow-hidden text-center capitalize whitespace-nowrap w-[66.925px] px-[18.4px] rounded border-[0.8px] border-solid border-zinc-800">
      visit
    </Button>
  </Link>
);

const UrlInfo: React.FC<UrlInfoProps> = ({ url, label, time }) => (
  <Flex justify="between">
    <div className="flex gap-2 items-center text-sm font-medium text-white">
      <div className="w-2.5 h-2.5 bg-green-300 rounded-full" />
      <a href={url} className="text-white cursor-pointer text-sm h-4 leading-4 transition-colors duration-200 w-[237.637px] overflow-hidden text-ellipsis whitespace-nowrap">
        {label}
      </a>
    </div>
    <Flex items="center" gap='4'>
      <span className="text-white text-xs font-medium h-[17.6px] leading-3 w-[76.175px] mx-0 my-0 px-1.5 py-0.5 rounded-full border-[0.8px] border-solid border-[#333]">
        Production
      </span>
      <time className="text-xs text-stone-500">{time}</time>
    </Flex>
  </Flex>
);

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

export default ProjectCard;