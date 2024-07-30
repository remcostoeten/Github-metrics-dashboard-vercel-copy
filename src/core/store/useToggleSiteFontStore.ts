// import { create } from "zustand";

// type FontState = {
//   currentFont: string;
//   setFont: (font: string) => void;
// };

// export const useFontStore = create<FontState>((set) => ({
//   currentFont: "geist-sans",
//   setFont: (font) => set({ currentFont: font }),
// }));

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface FontStore {
  currentFont: string;
  setFont: (font: string) => void;
}

export const useFontStore = create(
  persist<FontStore>(
    (set) => ({
      currentFont: 'geist-sans',
      setFont: (font) => set({ currentFont: font }),
    }),
    {
      name: 'font-storage',
    }
  )
);