"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { RepoData } from "@/types";
import { fetchGitHubActivities } from "@/server/actions/getGithubProject";

const ActivityItem: React.FC<RepoData> = ({ name, full_name, description, pushed_at, html_url, productionUrl, latestUrl }) => (
  <div className="flex flex-col py-2 border-b border-gray-700">
    <h3 className="text-lg font-semibold">
      <a href={html_url} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">
        {full_name}
      </a>
    </h3>
    <p className="text-sm text-gray-300">{description}</p>
    <div className="text-xs text-gray-400 mt-2">
      Last pushed: {new Date(pushed_at).toLocaleString()}
    </div>
    <div className="flex gap-2 mt-2">
      <a href={productionUrl} target="_blank" rel="noopener noreferrer" className="text-xs text-green-400 hover:underline">
        Production
      </a>
      <a href={latestUrl} target="_blank" rel="noopener noreferrer" className="text-xs text-yellow-400 hover:underline">
        Latest
      </a>
    </div>
  </div>
);

const ActivityList: React.FC = () => {
  const [activities, setActivities] = useState<RepoData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadActivities = async () => {
      try {
        setIsLoading(true);
        const data = await fetchGitHubActivities();
        setActivities(data);
      } catch (error) {
        console.error("Error loading activities:", error);
        setError("Failed to load recent activity");
      } finally {
        setIsLoading(false);
      }
    };

    loadActivities();
  }, []);

  if (isLoading) return <div className="text-white">Loading...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="bg-black text-white p-4 rounded-lg">
      <h2 className="text-xl font-bold mb-4">Recent Repository Activity</h2>
      {activities.map((activity, index) => (
        <ActivityItem key={index} {...activity} />
      ))}
      <button className="mt-4 text-blue-400 font-bold">
        View All Activity
      </button>
    </div>
  );
};

export default ActivityList;