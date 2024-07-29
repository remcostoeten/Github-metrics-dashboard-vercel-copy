"use server";

import { RepoData } from "@/types";

export async function fetchGitHubActivities(): Promise<RepoData[]> {
  const githubToken = process.env.GITHUB_TOKEN;
  const username = 'remcostoeten'; // Your GitHub username

  try {
    const response = await fetch(
      `https://api.github.com/users/${username}/events`,
      {
        headers: {
          Authorization: `token ${githubToken}`,
          Accept: "application/vnd.github.v3+json",
        },
        next: { revalidate: 10 }, // Revalidate every 10 seconds
      }
    );

    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.statusText}`);
    }

    const events = await response.json();

    const activities: RepoData[] = events.slice(0, 5).map((event: any) => ({
      id: event.id,
      imageUrl: event.actor.avatar_url,
      content: getEventContent(event),
      timestamp: new Date(event.created_at).getTime(),
    }));

    return activities;
  } catch (error) {
    console.error("Error fetching GitHub activities:", error);
    throw new Error("Failed to fetch GitHub activities");
  }
}

function getEventContent(event: any): string {
  switch (event.type) {
    case 'PushEvent':
      return `Pushed to ${event.repo.name}`;
    case 'CreateEvent':
      return `Created ${event.payload.ref_type} ${event.payload.ref || 'master'} in ${event.repo.name}`;
    default:
      return `Acted on ${event.repo.name}`;
  }
}