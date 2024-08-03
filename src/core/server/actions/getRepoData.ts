"use server";

import { githubToken } from "@/core/config/site-config";
import { ProjectData } from "@/types";

export async function getRepoData(repoName: string): Promise<ProjectData> {
  console.log("Fetching repo data for:", repoName);
  console.log(
    "Using GitHub token:",
    githubToken ? "Token is set" : "Token is not set",
  );

  if (!repoName.includes("/")) {
    throw new Error(
      'Invalid repository name. Please use the format "username/repo".',
    );
  }

  const repoResponse = await fetch(`https://api.github.com/repos/${repoName}`, {
    headers: {
      Authorization: `token ${githubToken}`,
    },
  });

  if (!repoResponse.ok) {
    const errorText = await repoResponse.text();
    console.error("GitHub API error:", repoResponse.status, errorText);
    throw new Error(
      `Failed to fetch repository data: ${repoResponse.status} ${errorText}`,
    );
  }

  const repoData = await repoResponse.json();

  const commitsResponse = await fetch(
    `https://api.github.com/repos/${repoName}/commits?per_page=1`,
    {
      headers: {
        Authorization: `token ${githubToken}`,
      },
    },
  );

  if (!commitsResponse.ok) {
    throw new Error("Failed to fetch commit data");
  }

  const [latestCommit] = await commitsResponse.json();

  const branchesResponse = await fetch(
    `https://api.github.com/repos/${repoName}/branches`,
    {
      headers: {
        Authorization: `token ${githubToken}`,
      },
    },
  );

  if (!branchesResponse.ok) {
    throw new Error("Failed to fetch branches data");
  }

  const branches = await branchesResponse.json();
  const branch =
    branches.find((branch: any) => branch.commit.sha === latestCommit.sha)
      ?.name || "unknown";

  return {
    full_name: repoData.full_name,
    name: repoData.name,
    url: repoData.html_url,
    productionUrl: repoData.homepage || "",
    latestCommit: {
      message: latestCommit.commit.message,
      date: latestCommit.commit.author.date,
      author: latestCommit.commit.author.name,
      branch: branch,
    },
    pushed_at: repoData.pushed_at,
  };
}
