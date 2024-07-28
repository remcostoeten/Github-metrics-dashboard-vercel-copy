'use client'

import React, { useState, useEffect, useMemo } from "react";
import { Avatar, AvatarImage } from "./ui/avatar";
import { AvatarFallback } from "@radix-ui/react-avatar";
import { ErrorBoundary } from "react-error-boundary";
import { Activity } from "@/types";
import { debounce } from 'lodash';
import { fetchGitHubActivities } from "@/server/actions/getGithubActivity";
import { ActivitySkeleton } from "./effects/skeleton";

const workerCode = `
  let pollInterval = 60000; // 60 seconds

  self.onmessage = function(e) {
    if (e.data === 'start') {
      poll();
    } else if (e.data.type === 'setInterval') {
      pollInterval = e.data.interval;
    }
  };

  function poll() {
    self.postMessage('poll');
    setTimeout(poll, pollInterval);
  }
`;

const ActivityList: React.FC = () => {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [worker, setWorker] = useState<Worker | null>(null);

  const loadActivities = async () => {
    if (!document.hidden) {
      try {
        const data = await fetchGitHubActivities();
        setActivities(data);
        setError(null);
      } catch (error) {
        console.error('Error loading activities:', error);
        setError('Failed to load repository data');
      } finally {
        setIsLoading(false);
      }
    }
  };

  const debouncedLoadActivities = useMemo(
    () => debounce(loadActivities, 1000),
    []
  );

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const blob = new Blob([workerCode], { type: 'application/javascript' });
      const newWorker = new Worker(URL.createObjectURL(blob));
      setWorker(newWorker);

      newWorker.onmessage = (e) => {
        if (e.data === 'poll') {
          debouncedLoadActivities();
        }
      };

      newWorker.postMessage('start');

      loadActivities();
    }

    return () => {
      worker?.terminate();
    };
  }, []);

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (!document.hidden && worker) {
        worker.postMessage({ type: 'setInterval', interval: 60000 });
      } else if (worker) {
        worker.postMessage({ type: 'setInterval', interval: 300000 }); // 5 minutes when tab is not visible
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [worker]);

  const memoizedActivities = useMemo(() => activities, [activities]);

  if (isLoading) {
    return <ActivitySkeleton />;
  }

  if (error) return <ErrorDisplay message={error} />;

  return (
    <section aria-label="Recent GitHub Activity">
      <h2 className="font-semibold">Recent Activity</h2>
      <ul className="mt-4 space-y-4">
        {memoizedActivities.map((activity, index) => (
          <li key={index} className="flex flex-col grow !mt-0 text-sm bg-blend-normal border-zinc-800 border-b">
            <div className="flex gap-3 items-center py-3 tracking-normal bg-blend-normal">
              <Avatar>
                <AvatarImage src={activity.imageUrl} />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <p className="flex-grow">{activity.content}</p>
              <time className="font-semibold text-[#666]">{activity.time}</time>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
};

const ErrorDisplay = ({ message }: { message: string }) => (
  <div role="alert" className="p-4 bg-red-100 border-l-4 border-red-500 text-red-700">
    <p className="font-bold">Error</p>
    <p>{message}</p>
  </div>
);

const ErrorFallback = ({ error, resetErrorBoundary }: { error: Error; resetErrorBoundary: () => void }) => (
  <div role="alert" className="p-4 bg-red-100 border-l-4 border-red-500 text-red-700">
    <p className="font-bold">Something went wrong:</p>
    <pre className="mt-2 text-sm">{error.message}</pre>
    <button 
      onClick={resetErrorBoundary}
      className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
    >
      Try again
    </button>
  </div>
);

export default function ActivityListWithErrorBoundary() {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <ActivityList />
    </ErrorBoundary>
  );
}