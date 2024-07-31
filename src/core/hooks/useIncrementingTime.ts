'use client';

import { useState, useEffect } from 'react';
import { getTimeSince } from '@/core/helpers/time-date-helpers';

export function useIncrementingTime(initialDate: string) {
  const [time, setTime] = useState(getTimeSince(new Date(initialDate)));

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(getTimeSince(new Date(initialDate)));
    }, 1000);

    return () => clearInterval(timer);
  }, [initialDate]);

  return time;
}

/**
 * Custom hook that returns the time elapsed since the initial date.
 * @param initialDate - The initial date as a string.
 * @returns The time elapsed since the initial date.
 */

/**
 * Renders a component that displays the elapsed time since the initial date.
function MyComponent() {
  const initialDate = "2022-01-01T00:00:00Z";
  const timeElapsed = useIncrementingTime(initialDate);

  return (
    <div>
      <h1>Time Elapsed: {timeElapsed}</h1>
    </div>
  );
}
*/
