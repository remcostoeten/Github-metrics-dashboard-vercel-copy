'use server'

import { revalidatePath } from 'next/cache'
import { siteConfig } from '../../../core/config/siteConfig';

interface GitHubEvent {
  type: string;
  actor: {
    avatar_url: string;
    login: string;
  };
  repo: {
    name: string;
  };
  created_at: string;
  payload?: any;
}

interface Activity {
  imageUrl: string;
  content: string;
  time: string;
}

export async function fetchGitHubActivities(): Promise<Activity[]> {
  const username = siteConfig.githubUsername;
  const githubToken = process.env.GITHUB_TOKEN;

  try {
    const response = await fetch(`https://api.github.com/users/${username}/events`, {
      headers: {
        'Authorization': `token ${githubToken}`,
        'Accept': 'application/vnd.github.v3+json'
      },
      next: { revalidate: 60 } // Revalidate every 60 seconds
    });

    if (!response.ok) {
      throw new Error('Failed to fetch GitHub events');
    }

    const events: GitHubEvent[] = await response.json();
    const activities: Activity[] = events.map(event => ({
      imageUrl: event.actor.avatar_url,
      content: formatEventContent(event),
      time: formatTime(new Date(event.created_at))
    }));

    revalidatePath('/'); // Revalidate the page that uses this data
    return activities;
  } catch (error) {
    console.error('Error fetching GitHub events:', error);
    throw new Error('Failed to fetch recent activity');
  }
}

function formatEventContent(event: GitHubEvent): string {
    switch (event.type) {
      case 'PushEvent':
        return `You pushed to ${event.repo.name}`;
      case 'CreateEvent':
        return `You created ${event.payload?.ref_type} ${event.payload?.ref || ''} in ${event.repo.name}`;
      case 'DeleteEvent':
        return `You deleted ${event.payload?.ref_type} ${event.payload?.ref} from ${event.repo.name}`;
      case 'IssuesEvent':
        return `You ${event.payload?.action} an issue in ${event.repo.name}`;
      case 'PullRequestEvent':
        return `You ${event.payload?.action} a pull request in ${event.repo.name}`;
      default:
        return `You performed an action in ${event.repo.name}`;
    }
  }
  
  function formatTime(date: Date): string {
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
    const diffInMinutes = Math.floor(diffInSeconds / 60);
    const diffInHours = Math.floor(diffInMinutes / 60);
    const diffInDays = Math.floor(diffInHours / 24);
  
    if (diffInDays > 0) return `${diffInDays}d`;
    if (diffInHours > 0) return `${diffInHours}h`;
    if (diffInMinutes > 0) return `${diffInMinutes}m`;
    return `${diffInSeconds}s`;
  }