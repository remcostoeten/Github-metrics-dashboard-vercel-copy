export function formatTimeAgo(timestamp: string) {
  const now = new Date();
  const past = new Date(timestamp);
  const diffInSeconds = Math.floor((now.getTime() - past.getTime()) / 1000);

  if (diffInSeconds < 60) {
    return `${diffInSeconds}s`;
  } else if (diffInSeconds < 3600) {
    return `${Math.floor(diffInSeconds / 60)}m`;
  } else if (diffInSeconds < 86400) {
    return `${Math.floor(diffInSeconds / 3600)}h`;
  } else {
    return `${Math.floor(diffInSeconds / 86400)}d`;
  }
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
}

export function getRelativeTime(timestamp: number): string {
  const now = Date.now();
  const diff = now - timestamp;

  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (days > 0) return `${days}d`;
  if (hours > 0) return `${hours}h`;
  if (minutes > 0) return `${minutes}m`;
  return `${seconds}s`;
}
