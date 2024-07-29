export const siteConfig = {
  siteName: "Remco Stoeten",
  siteUrl: "https://remcostoeten.com",
  githubUsername: "remcostoeten",
  githubRepoName: "github-activity-dashboard",
  githubUrl: "https://github.com/remcostoeten",
};

export const repos = [
  "remcostoeten/remcostoeten-all-in-one-dashboard",
  "remcostoeten/Github-metrics-dashboard-vercel-copy",
];

export const projects = [{ repoName: repos[0] }, { repoName: repos[1] }];

export const navigationItems = [
  { id: 1, label: "Home", path: "/" },
  { id: 2, label: "Dummy page", path: "/projects" },
];
