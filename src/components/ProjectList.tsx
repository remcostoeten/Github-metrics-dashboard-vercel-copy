'use client'

import Link from "next/link";
import ProjectCard from "./ProjectCard";
import HoverCard from "./effects/hover-card";
import { useRepoStore } from "@/core/stores/useRepoStore";

export default function ProjectList() {
  const repos = useRepoStore((state) => state.repos);

  const projectsToShow = repos.length > 0 ? repos : ["remcostoeten/all-in-one-dashboard", "remcostoeten/remcostoeten.com"];

  return (
    <div className="flex flex-col grow pb-9 -mt-5 bg-blend-normal max-md:mt-10 max-md:max-w-full space-y-2">
      {projectsToShow.map((repo, index) => (
        <HoverCard key={index} className="relative flex flex-col bg-dark rounded-md shadow-lg border border-zinc-800 overflow-hidden">
          <ProjectCard repoName={repo} url={`https://github.com/${repo}`} />
        </HoverCard>
      ))}
      <Link
        className="mt-9 text-sm text-blue-500 max-md:max-w-full"
        target="_blank"
        href="https://github.com/remcostoeten?tab=repositories"
      >
        View All Projects On Github
      </Link>
    </div>
  );
}