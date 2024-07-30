import { projects } from "@/core/config/site-config";
import Link from "next/link";
import ProjectCard from "./ProjectCard";
import HoverCard from "./effects/hover-card";

export default function ProjectList() {
  return (
    <div className="flex flex-col grow pb-9 -mt-5 bg-blend-normal max-md:mt-10 max-md:max-w-full space-y-2">
      {projects.map((project, index) => (
        <>
          <HoverCard className="relative flex flex-col bg-dark rounded-md shadow-lg border border-zinc-800 overflow-hidden">
            <ProjectCard key={index} repoName={project.repoName} url={""} />{" "}
          </HoverCard>
        </>
      ))}
      <Link
        className="mt-9 text-sm  text-blue-500 max-md:max-w-full"
        target="_blank"
        href="https://github.com/remcostoeten?tab=repositories"
      >
        View All Projects On Github
      </Link>
    </div>
  );
}
