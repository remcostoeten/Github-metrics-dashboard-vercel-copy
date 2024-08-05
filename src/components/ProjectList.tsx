"use client";

import React, { useState } from "react";
import Link from "next/link";
import HoverCard from "./effects/hover-card";
import { useRepoStore } from "@/core/store/repoStore";
import ProjectCard from "./features/ProjectCard/ProjectCard";
import { Button, Input } from './ui';
import { Flex } from './atoms/Flexer';

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
        <Flex>
          <div className="flex w-full">
            <Input
              type="text"
              value={inputRepo}
              onChange={(e) => setInputRepo(e.target.value)}
              placeholder="Enter GitHub repo (e.g., username/repo)"
              className="rounded-r-none"
            />
            <Button
              variant="gooeyLeft"
              type="button"
              className="text-white h-[65px] -translate-x-2 rounded-tl-none rounded-bl-none border-l-0 text-sm leading-8 bg-black cursor-pointer font-normal min-w-min text-center whitespace-nowrap py-4 px-8 rounded-l-none border-[0.8px] border-solid border-zinc-800"
            >
              visit
            </Button>
          </div>
        </Flex>
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