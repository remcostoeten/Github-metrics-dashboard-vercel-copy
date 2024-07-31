"use client";
import React, { useState, useEffect } from "react";
import { Avatar, AvatarImage } from "./ui/avatar";
import { AvatarFallback } from "@radix-ui/react-avatar";
import { Activity } from "@/types";
import { fetchGitHubActivities } from "@/server/actions/getGithubActivity";
import { ActivitySkeleton } from "./effects/skeleton";
import { formatTimeAgo } from "@/core/helpers/time-date-helpers";
import { AnimatedList } from "@/components/effects/animated-list";
import { cn } from "@/core/helpers/utils";
import { useGitHubStore } from "@/core/store/useGithubStore";

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
  const [worker, setWorker] = useState<Worker | null>(null);
  const fetchAmount = useGitHubStore((state) => state.fetchAmount);

  const loadActivities = async () => {
    if (!document.hidden) {
      try {
        const data = await fetchGitHubActivities(fetchAmount);
        const activities = data.map((activity) => ({
          ...activity,
          timestamp: activity.timestamp.toString(),
        }));
        setActivities(activities);
      } catch (error) {
        console.error("Error loading activities:", error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      const blob = new Blob([workerCode], { type: "application/javascript" });
      const newWorker = new Worker(URL.createObjectURL(blob));
      setWorker(newWorker);
      newWorker.onmessage = (e) => {
        if (e.data === "poll") {
          loadActivities();
        }
      };
      newWorker.postMessage("start");
      loadActivities();
    }
    return () => {
      worker?.terminate();
    };
  }, []);

  useEffect(() => {
    loadActivities();
  }, [fetchAmount]);

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (!document.hidden && worker) {
        worker.postMessage({ type: "setInterval", interval: 60000 });
      } else if (worker) {
        worker.postMessage({ type: "setInterval", interval: 300000 }); 
      }
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [worker]);

  if (isLoading) {
    return <ActivitySkeleton />;
  }

  return (
    <section
      aria-label="Recent GitHub Activity"
      className="relative pb-4 flex w-full flex-col overflow-hidden "
    >
      <h2 className="font-medium text-sm mb-6">Recent Activity</h2>
      <AnimatedList>
        {activities.map((activity, index) => (
          <ActivityItem key={index++} activity={activity} />
        ))}
      </AnimatedList>
    </section>
  );
};

const ActivityItem: React.FC<{ activity: Activity }> = ({ activity }) => {
  return (
    <figure
      className={cn(
        "relative mx-auto min-h-fit w-full cursor-pointer overflow-hidden",
        "transition-all duration-200 ease-in-out hover:scale-[103%] transform-gpu",
      )}
    >
      <div className="flex gap-3 items-center py-3 tracking-normal bg-blend-normal">
        <Avatar>
          <AvatarImage src={activity.imageUrl} />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <p className="flex-grow">{activity.content}</p>
        <time className="font-semibold text-[#666]">
          {formatTimeAgo(activity.timestamp)}
        </time>
      </div>
    </figure>
  );
};

export default ActivityList;
