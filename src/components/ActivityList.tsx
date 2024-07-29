'use client';

import React, { useEffect, useState, useCallback } from "react";
import { RepoData } from "@/types";
import ActivityItem from "./ActivityItem";
import { fetchGitHubActivities } from "@/server/actions/getGithubActivity";

const ActivityList: React.FC = () => {
  const [activities, setActivities] = useState<RepoData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadActivities = useCallback(async () => {
    try {
      const data = await fetchGitHubActivities();
      setActivities(prevActivities => {
        const newActivities = data.filter(newActivity => 
          !prevActivities.some(prevActivity => prevActivity.id === newActivity.id)
        );
        return [...newActivities, ...prevActivities].slice(0, 5);
      });
      setError(null);
    } catch (error) {
      console.error("Error loading activities:", error);
      setError("Failed to load recent activity");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadActivities();
    const intervalId = setInterval(loadActivities, 10000);

    return () => clearInterval(intervalId);
  }, [loadActivities]);

  useEffect(() => {
    const timer = setInterval(() => {
      setActivities(prevActivities => [...prevActivities]);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  if (isLoading) return <div className="text-white">Loading...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="bg-black text-white p-4 rounded-lg">
      <h2 className="text-xl font-bold mb-4">Recent Activity</h2>
      {activities.map((activity) => (
        <ActivityItem key={activity.id} {...activity} />
      ))}
    </div>
  );
};

export default ActivityList;
