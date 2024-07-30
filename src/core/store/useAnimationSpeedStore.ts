// import { create } from "zustand";

// interface AnimationSpeedState {
//   animationSpeed: number;
//   setAnimationSpeed: (speed: number) => void;
// }

// export const useAnimationSpeedStore = create<AnimationSpeedState>((set) => ({
//   animationSpeed: 1000, // Default speed in milliseconds
//   setAnimationSpeed: (speed: number) => set({ animationSpeed: speed }),
// }));

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AnimationSpeedStore {
  animationSpeed: number;
  setAnimationSpeed: (speed: number) => void;
}

export const useAnimationSpeedStore = create(
  persist<AnimationSpeedStore>(
    (set) => ({
      animationSpeed: 1000,
      setAnimationSpeed: (speed) => set({ animationSpeed: speed }),
    }),
    {
      name: 'animation-speed-storage',
    }
  )
);
