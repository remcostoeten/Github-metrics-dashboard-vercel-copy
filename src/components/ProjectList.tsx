import { projects } from "@/core/config/site-config";
import Link from "next/link";
import { MagicCard } from "@/components/effects/mouse-card";
import { CardHeader } from "./ui/card";
import ProjectCard from "./ProjectCard";

export default function ProjectList() {
  return (
    <div className="flex flex-col grow pb-9 -mt-5 bg-blend-normal max-md:mt-10 max-md:max-w-full space-y-2">
      {projects.map((project, index) => (
        <>
          <MagicCard className="cursor-pointer flex-col items-center justify-center shadow-2xl whitespace-nowrap text-4xl">
            <ProjectCard key={index} repoName={project.repoName} url={""} />{" "}
            {/* Use the type of ProjectCard */}
          </MagicCard>
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
