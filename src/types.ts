import { ReactNode } from "react";

export interface Activity {
  imageUrl: string;
  content: string;
  time: string;
}

export interface ActivityItemProps {
  imageUrl: string;
  content: React.ReactNode | string;
  time: string;
}

export interface GitHubEvent {
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

export interface CardBodyProps {
  productionUrl: string;
  latestUrl: string;
  productionTime: string;
  latestTime: string;
}

export interface UrlInfoProps {
  url: string;
  label: string;
  time: string;
}

export interface RepoData {
  name: string;
  full_name: string;
  description: string;
  html_url: string;
  pushed_at: string;
  productionUrl: string;
  latestUrl: string;
  lastDeployedAt: string;
}

export interface NavigationProps {
  className?: string;
  rounded?: string;
}

export interface ProjectData {
  name: string;
  html_url: string;
  pushed_at: string;
  updated_at: string;
  full_name: string;
  productionUrl: string;
  latestUrl: string;
  url: string;
  lastDeployedAt: string;
}

export interface ProjectCardProps {
  repoName: string;
  url: string;
}
export type Tab = {
  id: number;
  label: string;
  path: string;
  isActive: boolean;
  content: ReactNode;
};
