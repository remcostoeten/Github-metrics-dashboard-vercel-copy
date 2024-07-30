"use client";

import React from "react";
import { useAnimationControlStore } from "@/core/stores/useAnimationControlStore";

export function AnimationControlButton() {
  const isAnimationPaused = useAnimationControlStore(
    (state) => state.isAnimationPaused,
  );
  const toggleAnimation = useAnimationControlStore(
    (state) => state.toggleAnimation,
  );

  return (
    <button
      onClick={toggleAnimation}
      className="fixed top-2 left-4 bg-blue-500 text-white py-2 px-4 rounded-md"
    >
      {isAnimationPaused ? "Resume Animation" : "Pause Animation"}
    </button>
  );
}
