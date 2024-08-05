"use client";

import { useRepoStore } from "@/core/store/repoStore";
import { getLatestActiveRepos } from "@/server/actions/getRepoData";
import { ProjectData } from "@/types";
import Link from "next/link";
import { useState, useEffect } from "react";
import { Flex } from "./atoms/Flexer";
import HoverCard from "./effects/hover-card";
import ProjectCard from "./features/ProjectCard/ProjectCard";
import { Input, Button } from "./ui";

export default function ProjectList() {
  const [inputRepo, setInputRepo] = useState("");
  const [latestRepos, setLatestRepos] = useState<ProjectData[]>([]);
  const [loading, setLoading] = useState(false); // Add loading state
  const { repos, addRepo } = useRepoStore();

  useEffect(() => {
    async function fetchRepos() {
      setLoading(true); // Set loading to true before fetching
      try {
        const repos = await getLatestActiveRepos(5); // Set the limit here
        setLatestRepos(repos);
      } catch (error) {
        console.error("Failed to fetch latest repositories:", error);
      } finally {
        setLoading(false); // Set loading to false after fetching
      }
    }

    fetchRepos();
  }, []);

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
              Add repo
            </Button>
          </div>
        </Flex>
      </form>

      {loading ? (
        <div>Loading...</div>
      ) : (
        latestRepos.map((repo, index) => (
          <HoverCard key={index}>
            <ProjectCard repoName={repo.full_name} />
          </HoverCard>
        ))
      )}

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
