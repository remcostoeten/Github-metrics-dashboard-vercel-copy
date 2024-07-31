'use client';
import React, { ReactElement, useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useAnimationSpeedStore } from '@/core/store/useAnimationSpeedStore';
import { useAnimationControlStore } from '@/core/store/useAnimationControlStore';

export interface AnimatedListProps {
  className?: string;
  children: React.ReactNode;
}

export const AnimatedList = React.memo(
  ({ className, children }: AnimatedListProps) => {
    const [index, setIndex] = useState(0);
    const [isAnimationComplete, setIsAnimationComplete] = useState(false);
    const childrenArray = React.Children.toArray(children);
    const animationSpeed = useAnimationSpeedStore(
      (state) => state.animationSpeed,
    );
    const isAnimationPaused = useAnimationControlStore(
      (state) => state.isAnimationPaused,
    );
    const setIsAnimationPaused = useAnimationControlStore(
      (state) => state.setIsAnimationPaused,
    );

    useEffect(() => {
      if (
        !isAnimationPaused &&
        !isAnimationComplete &&
        index < childrenArray.length
      ) {
        const interval = setInterval(() => {
          setIndex((prevIndex) => {
            const newIndex = prevIndex + 1;
            if (newIndex >= childrenArray.length) {
              setIsAnimationComplete(true);
              setIsAnimationPaused(true);
              return prevIndex;
            }
            return newIndex;
          });
        }, animationSpeed);
        return () => clearInterval(interval);
      }
    }, [
      childrenArray.length,
      animationSpeed,
      isAnimationPaused,
      isAnimationComplete,
      index,
      setIsAnimationPaused,
    ]);

    const itemsToShow = useMemo(
      () => childrenArray.slice(0, index + 1).reverse(),
      [index, childrenArray],
    );

    const resetAnimation = () => {
      setIndex(0);
      setIsAnimationComplete(false);
      setIsAnimationPaused(false);
    };

    return (
      <div className={`flex flex-col items-center gap-4 ${className}`}>
        <AnimatePresence>
          {itemsToShow.map((item) => (
            <AnimatedListItem key={(item as ReactElement).key}>
              {item}
            </AnimatedListItem>
          ))}
        </AnimatePresence>
        {isAnimationComplete && (
          <button onClick={resetAnimation}>Reset Animation</button>
        )}
      </div>
    );
  },
);

AnimatedList.displayName = 'AnimatedList';

export function AnimatedListItem({ children }: { children: React.ReactNode }) {
  const animationSpeed = useAnimationSpeedStore(
    (state) => state.animationSpeed,
  );
  const animations = {
    initial: { scale: 0, opacity: 0 },
    animate: { scale: 1, opacity: 1, originY: 0 },
    exit: { scale: 0, opacity: 0 },
    transition: {
      type: 'spring',
      stiffness: 350,
      damping: 40,
      duration: animationSpeed / 1000,
    },
  };
  return (
    <motion.div {...animations} layout className="mx-auto w-full">
      {children}
    </motion.div>
  );
}
