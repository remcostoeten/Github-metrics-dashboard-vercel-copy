export const siteConfig = {
    siteName: "Remco Stoeten",
    siteUrl: "https://remcostoeten.com",
    githubUsername: "remcostoeten",
    githubRepoName: "github-activity-dashboard",
    get githubUrl() {
        return `https://github.com/${this.githubUsername}/${this.githubRepoName}`;
    }
};