import { create } from "zustand";

interface AnimationSpeedState {
  animationSpeed: number;
  setAnimationSpeed: (speed: number) => void;
}

export const useAnimationSpeedStore = create<AnimationSpeedState>((set) => ({
  animationSpeed: 1000, // Default speed in milliseconds
  setAnimationSpeed: (speed: number) => set({ animationSpeed: speed }),
}));
