import { create } from 'zustand';
import { repos as configRepos } from '@/core/config/site-config';

interface RepoStore {
  repos: string[];
  addRepo: (repo: string) => void;
  removeRepo: (repo: string) => void;
  replaceRepos: (newRepos: string[]) => void;
}

export const useRepoStore = create<RepoStore>((set) => ({
  repos: configRepos,
  addRepo: (repo) => set((state) => ({ repos: [...state.repos, repo] })),
  removeRepo: (repo) => set((state) => ({ repos: state.repos.filter(r => r !== repo) })),
  replaceRepos: (newRepos) => set({ repos: newRepos }),
}));