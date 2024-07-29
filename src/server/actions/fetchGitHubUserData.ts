"use server";

import { RepoData } from "@/types";

export async function fetchGitHubActivities(): Promise<RepoData[]> {
  const githubToken = process.env.GITHUB_TOKEN;
  const username = 'remcostoeten';

  if (!githubToken) {
    throw new Error("GitHub token is not defined. Please set the GITHUB_TOKEN environment variable.");
  }

  let allEvents: any[] = [];
  let page = 1;

  try {
    while (true) {
      const response = await fetch(
        `https://api.github.com/users/${username}/events?page=${page}`,
        {
          headers: {
            Authorization: `token ${githubToken}`,
            Accept: "application/vnd.github.v3+json",
          },
          next: { revalidate: 10 }, // Revalidate every 10 seconds
        }
      );

      if (!response.ok) {
        console.error(`GitHub API error: ${response.statusText} (status: ${response.status})`);
        throw new Error(`GitHub API error: ${response.statusText}`);
      }

      const events = await response.json();
      if (events.length === 0) break;

      allEvents = allEvents.concat(events);
      page++;
    }

    const activities: RepoData[] = allEvents.map((event: any) => ({
      id: event.id,
      imageUrl: event.actor.avatar_url,
      type: event.type,
      repoName: event.repo.name,
      content: getEventContent(event),
      timestamp: new Date(event.created_at).getTime(),
      payload: event.payload,
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
    case 'ForkEvent':
      return `Forked ${event.repo.name} to ${event.payload.forkee.full_name}`;
    case 'WatchEvent':
      return `Started watching ${event.repo.name}`;
    case 'IssuesEvent':
      return `${event.payload.action} issue #${event.payload.issue.number} in ${event.repo.name}`;
    case 'IssueCommentEvent':
      return `Commented on issue #${event.payload.issue.number} in ${event.repo.name}`;
    case 'PullRequestEvent':
      return `${event.payload.action} pull request #${event.payload.pull_request.number} in ${event.repo.name}`;
    case 'PullRequestReviewEvent':
      return `Reviewed pull request #${event.payload.pull_request.number} in ${event.repo.name}`;
    case 'PullRequestReviewCommentEvent':
      return `Commented on pull request #${event.payload.pull_request.number} in ${event.repo.name}`;
    case 'DeleteEvent':
      return `Deleted ${event.payload.ref_type} ${event.payload.ref} in ${event.repo.name}`;
    case 'GollumEvent':
      return `Updated the wiki in ${event.repo.name}`;
    case 'PublicEvent':
      return `Made ${event.repo.name} public`;
    case 'ReleaseEvent':
      return `Released ${event.payload.release.tag_name} in ${event.repo.name}`;
    case 'MemberEvent':
      return `Added ${event.payload.member.login} as a collaborator to ${event.repo.name}`;
    case 'CommitCommentEvent':
      return `Commented on a commit in ${event.repo.name}`;
    case 'SponsorshipEvent':
      return `${event.payload.action} sponsorship for ${event.repo.name}`;
    default:
      return `Performed an action on ${event.repo.name}`;
  }
}
