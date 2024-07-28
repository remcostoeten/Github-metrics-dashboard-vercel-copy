'use client'

import { fetchGitHubActivities } from "@/server/actions/getGithubActivity";
import React, { useState } from "react";
import { Avatar, AvatarImage } from "./ui/avatar";
import { AvatarFallback } from "@radix-ui/react-avatar";

interface Activity {
  imageUrl: string;
  content: string;
  time: string;
}

const ActivityList: React.FC = () => {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadActivities = async () => {
    if (!isLoading) setIsLoading(true);
    try {
      const data = await fetchGitHubActivities();
      setActivities(data);
    } catch (error) {
      console.error('Error loading activities:', error);
      setError('Failed to load repository data');
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    loadActivities();
    return <div>Loading...</div>;
  }
  if (error) return <div>{error}</div>;

  return (
    <div>
      <h2>Recent Activity</h2>
      {activities.map((activity, index) => (
        <div key={index}>
          <Avatar>
  <AvatarImage src={activity.imageUrl} />
  <AvatarFallback>CN</AvatarFallback>
</Avatar>
          <p>{activity.content}</p>
          <p>Time: {activity.time}</p>
        </div>
      ))}
    </div>
  );
};

export default ActivityList;