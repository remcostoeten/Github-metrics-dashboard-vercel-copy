/**
 * Represents the configuration for the site.
 */
export const siteConfig = {
  siteName: "Remco Stoeten",
  siteUrl: "https://remcostoeten.com",
  githubUsername: "remcostoeten",
  githubRepoName: "github-activity-dashboard",
  githubUrl: "https://github.com/remcostoeten",
};

/**
 * Represents the list of repositories.
 */
export const repos = [
  "remcostoeten/remcostoeten-all-in-one-dashboard",
  "remcostoeten/nextjs-github-metrics-vercel-style",
];

/**
 * Represents the list of projects with their respective repository names.
 */
export const projects = [{ repoName: repos[0] }, { repoName: repos[1] }];

/**
 * Represents the navigation items for the site.
 */
export const navigationItems = [
  { id: 1, label: "Home", path: "/" },
  { id: 2, label: "Dummy page", path: "/projects" },
  { id: 3, label: "Geist showcase", path: "/geist" },
  { id: 4, label: "UI settings", path: "/settings" },
];

/**
 * Represents the GitHub token used for authentication.
 */
export const githubToken = process.env.GITHUB_TOKEN;

/**
 * Represents the site configuration options.
 */
export const siteConfiguration = {
  enableLogging: true, /* Whether logging is enabled */
  logDirectory: "logs", /* The directory where logs (locally) are stored */
};