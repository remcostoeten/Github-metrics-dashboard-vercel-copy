'use client'

import React, { useEffect, useState } from "react";
import Image from 'next/image';
import { fetchGitHubActivities } from "@/server/actions/getGithubActivity";

interface Activity {
  imageUrl: string;
  content: string;
  time: string;
}

const ActivityItem: React.FC<Activity> = ({ imageUrl, content, time }) => (
  <div className="flex items-center py-2 border-b border-gray-700">
    <Image src={imageUrl} alt="Avatar" width={32} height={32} className="rounded-full mr-3" />
    <div className="flex-grow">
      <p className="text-white">{content}</p>
    </div>
    <span className="text-gray-400 text-sm">{time}</span>
  </div>
);

const ActivityList: React.FC = () => {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadActivities = async () => {
      try {
        setIsLoading(true);
        const data = await fetchGitHubActivities();
        setActivities(data);
      } catch (error) {
        console.error('Error loading activities:', error);
        setError('Failed to load recent activity');
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
      <h2 className="text-xl font-bold mb-4">Recent Activity</h2>
      {activities.map((activity, index) => (
        <ActivityItem key={index} {...activity} />
      ))}
      <button className="mt-4 text-blue-400 font-bold">View All Activity</button>
    </div>
  );
};

export default ActivityList;