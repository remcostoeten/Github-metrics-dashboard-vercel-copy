export const siteConfig = {
  siteName: "Remco Stoeten",
  siteUrl: "https://remcostoeten.com",
  githubUsername: "remcostoeten",
  githubRepoName: "github-activity-dashboard",
  githubUrl: "https://github.com/remcostoeten",
};

export const repos = [
  "remcostoeten/remcostoeten-all-in-one-dashboard",
  "remcostoeten/nextjs-github-metrics-vercel-style",
];

export const projects = [{ repoName: repos[0] }, { repoName: repos[1] }];

export const navigationItems = [
  { id: 1, label: "Home", path: "/" },
  { id: 2, label: "Dummy page", path: "/projects" },
  { id: 3, label: "Geist showcase", path: "/geist" },
  { id: 4, label: "UI settings", path: "/settings" },
];

export const githubToken = process.env.GITHUB_TOKEN;
