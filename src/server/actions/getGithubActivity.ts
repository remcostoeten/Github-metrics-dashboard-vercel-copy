'use server'

import { revalidatePath } from 'next/cache'
import { siteConfig } from '../../../core/config/siteConfig';
import { formatTime } from '@/lib/utils';
import { Activity, GitHubEvent } from '@/types';
import { cache } from 'react';

const CACHE_TIME = 60000; // 1 minute

let cachedActivities: Activity[] | null = null;
let lastFetchTime = 0;

const fetchGitHubActivitiesWithCache = cache(async (): Promise<Activity[]> => {
  const currentTime = Date.now();
  if (cachedActivities && (currentTime - lastFetchTime < CACHE_TIME)) {
    return cachedActivities;
  }

  const username = siteConfig.githubUsername;
  const githubToken = process.env.GITHUB_TOKEN;

  try {
    const response = await fetch(`https://api.github.com/users/${username}/events?per_page=5`, {
      headers: {
        'Authorization': `token ${githubToken}`,
        'Accept': 'application/vnd.github.v3+json'
      },
      next: { revalidate: 60 }
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

    cachedActivities = activities;
    lastFetchTime = currentTime;

    revalidatePath('/');
    return activities;
  } catch (error) {
    console.error('Error fetching GitHub events:', error);
    throw new Error('Failed to fetch recent activity');
  }
});

export const fetchGitHubActivities = fetchGitHubActivitiesWithCache;

function formatEventContent(event: GitHubEvent): string {
  switch (event.type) {
    case 'PushEvent':
      return `Pushed to ${event.repo.name}`;
    case 'CreateEvent':
      return `Created ${event.payload?.ref_type} ${event.payload?.ref || ''} in ${event.repo.name}`;
    case 'DeleteEvent':
      return `Deleted ${event.payload?.ref_type} ${event.payload?.ref} from ${event.repo.name}`;
    case 'IssuesEvent':
      return `${event.payload?.action} an issue in ${event.repo.name}`;
    case 'PullRequestEvent':
      return `${event.payload?.action} a pull request in ${event.repo.name}`;
    default:
      return `Performed an action in ${event.repo.name}`;
  }
}