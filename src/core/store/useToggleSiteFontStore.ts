import { create } from "zustand";

type FontState = {
  currentFont: string;
  setFont: (font: string) => void;
};

export const useFontStore = create<FontState>((set) => ({
  currentFont: "geist-sans",
  setFont: (font) => set({ currentFont: font }),
}));
