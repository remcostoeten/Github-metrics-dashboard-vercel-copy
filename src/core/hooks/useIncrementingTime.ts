"use client";

import { useState, useEffect } from "react";
import { getTimeSince } from "@/core/helpers/time-date-helpers";

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
