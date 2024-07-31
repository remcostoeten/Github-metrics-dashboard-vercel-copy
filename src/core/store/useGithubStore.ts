import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface GitHubStore {
  fetchAmount: number;
  setFetchAmount: (amount: number) => void;
}

export const useGitHubStore = create(
  persist<GitHubStore>(
    (set) => ({
      fetchAmount: 5,
      setFetchAmount: (amount) => {
        console.log('Updating fetchAmount to:', amount);
        set({ fetchAmount: amount });
      },
    }),
    {
      name: 'github-storage', // unique name for localStorage
    },
  ),
);
