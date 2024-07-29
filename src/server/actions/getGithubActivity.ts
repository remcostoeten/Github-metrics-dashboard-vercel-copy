"use server";
import { RepoData } from "@/types";
import fs from 'fs';
import path from 'path';

// Function to write logs to a JSON file
function writeLogsToJson(data: any, filename: string) {
  const logDir = path.join(process.cwd(), 'logs');
  if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir);
  }
  const filePath = path.join(logDir, filename);
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
  console.log(`Logs written to ${filePath}`);
}

export async function fetchGitHubActivities(): Promise<RepoData[]> {
  const githubToken = process.env.GITHUB_TOKEN;
  const username = 'remcostoeten'; // Your GitHub username
  console.log("Fetching GitHub activities...");
  
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
    console.log("GitHub events data:", events);
    writeLogsToJson(events, 'github_events.json');
    
    const activities: RepoData[] = events.slice(0, 5).map((event: any) => ({
      id: event.id,
      imageUrl: event.actor.avatar_url,
      type: event.type,
      repoName: event.repo.name,
      content: getEventContent(event),
      timestamp: new Date(event.created_at).toTimeString(),
      payload: event.payload,
    }));
    
    console.log("Parsed activities:", activities);
    writeLogsToJson(activities, 'parsed_activities.json');
    
    return activities;
  } catch (error) {
    console.error("Error fetching GitHub activities:", error);
    writeLogsToJson({ error: error.message }, 'error_log.json');
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