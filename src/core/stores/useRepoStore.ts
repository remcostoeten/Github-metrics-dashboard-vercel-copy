import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface RepoStore {
  repos: string[];
  addRepo: (repo: string) => void;
  removeRepo: (repo: string) => void;
}

export const useRepoStore = create(
  persist<RepoStore>(
    (set) => ({
      repos: ["remcostoeten/all-in-one-dashboard", "remcostoeten/remcostoeten.com"], 
      addRepo: (repo) => set((state) => ({ repos: [...state.repos, repo] })),
      removeRepo: (repo) => set((state) => ({ repos: state.repos.filter(r => r !== repo) })),
    }),
    {
      name: 'repo-storage',
    }
  )
);