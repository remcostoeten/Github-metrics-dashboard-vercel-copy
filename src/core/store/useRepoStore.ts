import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface RepoStore {
  repos: string[];
  addRepo: (repo: string) => void;
  removeRepo: (repo: string) => void;
}

export const useRepoStore = create<RepoStore>()(
  persist(
    (set) => ({
      repos: [],
      addRepo: (repo) => set((state) => ({ repos: [...state.repos, repo] })),
      removeRepo: (repo) => set((state) => ({ repos: state.repos.filter(r => r !== repo) })),
    }),
    {
      name: 'repo-storage',
    }
  )
);