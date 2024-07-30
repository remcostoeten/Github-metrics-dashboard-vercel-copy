// import { create } from "zustand";

// interface AnimationControlState {
//   isAnimationPaused: boolean;
//   setIsAnimationPaused: (isPaused: boolean) => void;
//   toggleAnimation: () => void;
// }

// export const useAnimationControlStore = create<AnimationControlState>(
//   (set) => ({
//     isAnimationPaused: false,
//     setIsAnimationPaused: (isPaused: boolean) =>
//       set({ isAnimationPaused: isPaused }),
//     toggleAnimation: () =>
//       set((state) => ({ isAnimationPaused: !state.isAnimationPaused })),
//   }),
// );

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AnimationControlStore {
  isAnimationPaused: boolean;
  setIsAnimationPaused: (isPaused: boolean) => void;
}

export const useAnimationControlStore = create(
  persist<AnimationControlStore>(
    (set) => ({
      isAnimationPaused: false,
      setIsAnimationPaused: (isPaused) => set({ isAnimationPaused: isPaused }),
    }),
    {
      name: 'animation-control-storage',
    }
  )
);
