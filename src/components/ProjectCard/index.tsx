'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ProjectCardProps } from '@/types';
import { LoadingSkeleton } from '../effects/skeleton';
import { useIncrementingTime } from '@/core/hooks/useIncrementingTime';
import { useRepoStore } from '@/core/store/repoStore';
import CardHeader from './CardHeader';
import CardBody from './CardBody';
import CardFooter from './CardFooter';
import { useProjectData } from '@/core/hooks/useProjectData';

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
        <CardFooter repoName={projectData.full_name} />
      </div>
      <motion.div className="pointer-events-none absolute -inset-px rounded-md opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
    </div>
  );
}
