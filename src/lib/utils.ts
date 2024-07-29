import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatTime(date: Date): string {
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  const diffInHours = Math.floor(diffInMinutes / 60);
  const diffInDays = Math.floor(diffInHours / 24);

  if (diffInDays > 0) return `${diffInDays}d `;
  if (diffInHours > 0) return `${diffInHours}h `;
  if (diffInMinutes > 0) return `${diffInMinutes}m `;
  return `${diffInSeconds}s `;
}

export function getTimeSince(date: Date): string {
  const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);
  let interval = seconds / 31536000;
  if (interval > 1) return Math.floor(interval) + "y ";
  interval = seconds / 2592000;
  if (interval > 1) return Math.floor(interval) + "mo ";
  interval = seconds / 86400;
  if (interval > 1) return Math.floor(interval) + "d ";
  interval = seconds / 3600;
  if (interval > 1) return Math.floor(interval) + "h ";
  interval = seconds / 60;
  if (interval > 1) return Math.floor(interval) + "m ";
  return Math.floor(seconds) + "s ";
};
