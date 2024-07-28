'use client'

import React from "react";
import ProjectCard from "./ProjectCard";

const projects = [
  { repoName: "remcostoeten/password-manager" },
  { repoName: "remcostoeten/remcostoeten-all-in-one-dashboard" },

];

const ProjectList: React.FC = () => {
  return (
    <div className="flex flex-col grow pb-9 -mt-5 bg-blend-normal max-md:mt-10 max-md:max-w-full space-y-2">
      {projects.map((project, index) => (
        <ProjectCard key={index} repoName={project.repoName} />
      ))}
      <div className="mt-9 text-sm font-bold text-blue-500 max-md:max-w-full">
        View All Projects
      </div>
    </div>
  );
};

export default ProjectList;