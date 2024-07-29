"use server";

import { revalidatePath } from "next/cache";

export interface GitHubUserData {
  login: string;
  name: string;
  avatar_url: string;
  html_url: string;
  bio: string;
  public_repos: number;
  followers: number;
  following: number;
  type: string;
}

export async function fetchGitHubUserData(
  username: string,
): Promise<GitHubUserData | null> {
  const githubToken = process.env.GITHUB_TOKEN;

  try {
    console.log(`Fetching data for user ${username}`);
    const response = await fetch(`https://api.github.com/users/${username}`, {
      headers: {
        Authorization: `token ${githubToken}`,
        Accept: "application/vnd.github.v3+json",
      },
      next: { revalidate: 3600 }, // Revalidate every hour
    });

    if (!response.ok) {
      console.error(
        `GitHub API error for user ${username}:`,
        await response.text(),
      );
      throw new Error(`Failed to fetch GitHub data for user ${username}`);
    }

    const data: GitHubUserData = await response.json();

    revalidatePath("/"); // Adjust this path as needed

    return data;
  } catch (error) {
    console.error("Error fetching GitHub user data:", error);
    return null;
  }
}
