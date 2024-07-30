
// import { create } from "zustand";
// import { persist } from "zustand/middleware";
// import * as prismThemes from "react-syntax-highlighter/dist/esm/styles/prism";

// export type CodeThemeStore = {
//   currentTheme: string;
//   setCurrentTheme: (theme: string) => void;
//   themes: Record<string, any>;
// };

// const useCodeThemeStore = create(
//   persist(
//     (set) => ({
//       currentTheme: "vscDarkPlus",
//       setCurrentTheme: (theme) => set({ currentTheme: theme }),
//       themes: Object.keys(prismThemes).reduce(
//         (acc, themeName) => {
//           acc[themeName] = prismThemes[themeName];
//           return acc;
//         },
//         {} as Record<string, any>,
//       ),
//     }),
//     {
//       name: "code-theme-storage",
//     },
//   ),
// );

// export default useCodeThemeStore;
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface CodeThemeStore {
  currentTheme: string;
  setCurrentTheme: (theme: string) => void;
}

export const useCodeThemeStore = create(
  persist<CodeThemeStore>(
    (set) => ({
      currentTheme: 'vs-dark',
      setCurrentTheme: (theme) => set({ currentTheme: theme }),
    }),
    {
      name: 'code-theme-storage',
    }
  )
);
