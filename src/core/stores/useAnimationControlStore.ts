import { create } from "zustand";

interface AnimationControlState {
  isAnimationPaused: boolean;
  setIsAnimationPaused: (isPaused: boolean) => void;
  toggleAnimation: () => void;
}

export const useAnimationControlStore = create<AnimationControlState>(
  (set) => ({
    isAnimationPaused: false,
    setIsAnimationPaused: (isPaused: boolean) =>
      set({ isAnimationPaused: isPaused }),
    toggleAnimation: () =>
      set((state) => ({ isAnimationPaused: !state.isAnimationPaused })),
  }),
);
