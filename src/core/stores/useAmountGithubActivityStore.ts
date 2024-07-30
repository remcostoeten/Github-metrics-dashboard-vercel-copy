// import { create } from "zustand";
// import { persist } from "zustand/middleware";

// interface GitHubStore {
//   fetchAmount: number;
//   setFetchAmount: (amount: number) => void;
// }

// export const useAmountGithubActivityStore = create(
//   persist<GitHubStore>(
//     (set) => ({
//       fetchAmount: 5,
//       setFetchAmount: (amount) => {
//         console.log("Updating fetchAmount to:", amount);
//         set({ fetchAmount: amount });
//       },
//     }),
//     {
//       name: "github-storage", // unique name for localStorage
//     },
//   ),
// );

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AmountGithubActivityStore {
  fetchAmount: number;
  setFetchAmount: (amount: number) => void;
}

export const useAmountGithubActivityStore = create(
  persist<AmountGithubActivityStore>(
    (set) => ({
      fetchAmount: 10,
      setFetchAmount: (amount) => set({ fetchAmount: amount }),
    }),
    {
      name: 'github-activity-amount-storage',
    }
  )
);
