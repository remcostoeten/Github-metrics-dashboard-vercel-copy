"use server";

import { githubToken } from "@/core/config/site-config";
import { ProjectData } from "@/types";

async function fetchWithAuth(url: string) {
  const response = await fetch(url, {
    headers: {
      Authorization: `token ${githubToken}`,
    },
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error("GitHub API error:", response.status, errorText);
    throw new Error(`Failed to fetch data: ${response.status} ${errorText}`);
  }

  return response.json();
}

export async function getLatestActiveRepos(
  limit: number = 10,
): Promise<ProjectData[]> {
  const repos = await fetchWithAuth("https://api.github.com/user/repos");

  // Sort repositories by pushed_at date in descending order
  repos.sort(
    (a: any, b: any) =>
      new Date(b.pushed_at).getTime() - new Date(a.pushed_at).getTime(),
  );

  // Limit the number of repositories
  const limitedRepos = repos.slice(0, limit);

  // Fetch detailed data for each repository in parallel
  const repoDataPromises = limitedRepos.map((repo: any) =>
    getRepoData(repo.full_name),
  );
  return Promise.all(repoDataPromises);
}

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

  const repoData = await fetchWithAuth(
    `https://api.github.com/repos/${repoName}`,
  );
  const [latestCommit] = await fetchWithAuth(
    `https://api.github.com/repos/${repoName}/commits?per_page=1`,
  );
  const branches = await fetchWithAuth(
    `https://api.github.com/repos/${repoName}/branches`,
  );

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
