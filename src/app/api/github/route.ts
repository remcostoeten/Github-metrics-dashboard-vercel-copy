// app/api/github/route.ts
import { repos } from 'core/config/siteConfig';
import { NextResponse } from 'next/server';

export async function GET() {
  const githubToken = process.env.GITHUB_TOKEN;
  const vercelToken = process.env.VERCEL_TOKEN;

  try {
    console.log('Vercel Token:', vercelToken?.substring(0, 5) + '...');

    const projectData = await Promise.all(repos.map(async (repo) => {
      console.log(`Fetching data for ${repo}`);
      
      // Fetch GitHub data
      const githubResponse = await fetch(`https://api.github.com/repos/${repo}`, {
        headers: { Authorization: `token ${githubToken}` },
      });
      if (!githubResponse.ok) {
        console.error(`GitHub API error for ${repo}:`, await githubResponse.text());
        throw new Error(`Failed to fetch GitHub data for ${repo}`);
      }
      const githubData = await githubResponse.json();

      return {
        ...githubData,
        productionUrl: `https://${githubData.name}.vercel.app`,
        latestUrl: `https://${githubData.name}-latest.vercel.app`,
        lastDeployedAt: new Date().toISOString(), // placeholder
      };
    }));

    console.log('Data fetched successfully');
    return NextResponse.json(projectData);
  } catch (error) {
    console.error('Error in API route:', error);
    return NextResponse.json({ error: 'Failed to fetch data' }, { status: 500 });
  }
}