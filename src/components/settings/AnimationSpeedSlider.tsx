
"use client";

import React, { useState, useEffect } from "react";
import { useAnimationSpeedStore } from "@/core/store/useAnimationSpeedStore";

export function AnimationSpeedSlider() {
  const animationSpeed = useAnimationSpeedStore(
    (state) => state.animationSpeed,
  );
  const setAnimationSpeed = useAnimationSpeedStore(
    (state) => state.setAnimationSpeed,
  );
  const [inputValue, setInputValue] = useState(animationSpeed);

  useEffect(() => {
    setInputValue(animationSpeed);
  }, [animationSpeed]);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    console.log("Animation speed updated to:", inputValue);
    setAnimationSpeed(inputValue);
  };

  return (
    <div className="w-full max-w-sm fixed top-64 left-4 bg-white text-black p-4">
      <form onSubmit={handleSubmit}>
        <label
          htmlFor="animation-speed"
          className="block text-sm font-medium text-gray-700"
        >
          Animation Speed (ms)
        </label>
        <input
          id="animation-speed"
          type="number"
          min={100}
          max={5000}
          step={100}
          value={inputValue}
          onChange={(e) => setInputValue(Number(e.target.value))}
          className="mt-2 block w-full p-2 border border-gray-300 rounded-md"
        />
        <button
          type="submit"
          className="mt-2 w-full bg-blue-500 text-white py-2 px-4 rounded-md"
        >
          Update Speed
        </button>
      </form>
      <span className="mt-2 block text-sm text-gray-500">
        Current speed: {animationSpeed}ms
      </span>
    </div>
  );
}
