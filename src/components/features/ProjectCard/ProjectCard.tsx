'use client'

import { motion, AnimatePresence } from 'framer-motion';
import CardHeader from './CardHeader';
import CardBody from './CardBody';
import CardFooter from './CardFooter';
import { useIncrementingTime } from '@/core/hooks/useIncrementingTime';
import { useProjectData } from '@/core/hooks/useProjectData';
import { LoadingSkeleton } from '@/components/effects/skeleton';

interface ProjectCardProps {
  repoName: string;
}

export default function ProjectCard({ repoName }: ProjectCardProps) {
  const { projectData, isPending, isRemoving, removeRepo } = useProjectData(repoName);

  const timeSinceLastCommit = useIncrementingTime(
    projectData?.latestCommit.date,
  );
  const timeSinceDeployment = useIncrementingTime(projectData?.pushed_at);

  if (isPending || !projectData) return <LoadingSkeleton />;

  return (
    <AnimatePresence>
      {!isRemoving && (
        <motion.div
          className="relative flex flex-col bg-black rounded-md shadow-lg border border-zinc-800 group"
          initial={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.3 }}
        >
          <div className="relative z-10">
            <CardHeader
              href={projectData.url}
              title={projectData.name}
              onRemove={removeRepo}
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
        </motion.div>
      )}
    </AnimatePresence>
  );
}