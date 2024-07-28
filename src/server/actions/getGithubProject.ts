'use server'

import { RepoData } from '@/types';
import { repos } from 'core/config/siteConfig';
import { revalidatePath } from 'next/cache';

export async function fetchGitHubActivities(): Promise<RepoData[]> {
  const githubToken = process.env.GITHUB_TOKEN;

  try {
    const projectData = await Promise.all(repos.map(async (repo) => {
      console.log(`Fetching data for ${repo}`);
      
      const githubResponse = await fetch(`https://api.github.com/repos/${repo}`, {
        headers: { 
          'Authorization': `token ${githubToken}`,
          'Accept': 'application/vnd.github.v3+json'
        },
        next: { revalidate: 3600 } // Revalidate every hour
      });

      if (!githubResponse.ok) {
        console.error(`GitHub API error for ${repo}:`, await githubResponse.text());
        throw new Error(`Failed to fetch GitHub data for ${repo}`);
      }

      const githubData = await githubResponse.json();

      return {
        name: githubData.name,
        full_name: githubData.full_name,
        description: githubData.description,
        html_url: githubData.html_url,
        pushed_at: githubData.pushed_at,
        productionUrl: `https://${githubData.name}.vercel.app`,
        latestUrl: `https://${githubData.name}-latest.vercel.app`,
        lastDeployedAt: new Date().toISOString(), 
      };
    }));

    revalidatePath('/'); 
    return projectData;
  } catch (error) {
    console.error('Error fetching GitHub data:', error);
    throw new Error('Failed to fetch repository data');
  }
}