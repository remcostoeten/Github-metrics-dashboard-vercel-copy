"use client";

import React, { useState } from "react";
import Link from "next/link";
import HoverCard from "./effects/hover-card";
import { useRepoStore } from "@/core/store/repoStore";
import ProjectCard from "./features/ProjectCard/ProjectCard";

export default function ProjectList() {
  const [inputRepo, setInputRepo] = useState("");
  const { repos, addRepo } = useRepoStore();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputRepo && !repos.includes(inputRepo)) {
      addRepo(inputRepo);
      setInputRepo("");
    }
  };

  return (
    <div className="flex flex-col grow pb-9 -mt-5 bg-blend-normal max-md:mt-10 max-md:max-w-full space-y-2">
      <form onSubmit={handleSubmit} className="mb-4">
        <input
          type="text"
          value={inputRepo}
          onChange={(e) => setInputRepo(e.target.value)}
          placeholder="Enter GitHub repo (e.g., username/repo)"
          className="p-2 border rounded"
        />
        <button
          type="submit"
          className="ml-2 p-2 bg-blue-500 text-white rounded"
        >
          Add Repo
        </button>
      </form>

      {repos.map((repo, index) => (
        <HoverCard key={index}>
          <ProjectCard repoName={repo} />
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
