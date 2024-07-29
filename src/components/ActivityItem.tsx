import React from "react";
import Image from "next/image";
import { RepoData } from "@/types";

const ActivityItem: React.FC<RepoData> = ({
  imageUrl,
  content,
  timestamp,
}) => {
  const getRelativeTime = (timestamp: number) => {
    const seconds = Math.floor((Date.now() - timestamp) / 1000);
    if (seconds < 60) return `${seconds}s ago`;
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes}m ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h ago`;
    const days = Math.floor(hours / 24);
    return `${days}d ago`;
  };

  return (
    <div className="flex gap-3 items-center py-3 tracking-normal bg-blend-normal">
      <Image
        loading="lazy"
        src={imageUrl}
        width={32}
        height={32}
        alt="Activity Image"
        className="shrink-0 self-stretch my-auto w-8 border border-solid bg-blend-normal aspect-square border-zinc-800 rounded-[50px]"
      />
      <div className="flex-auto self-stretch my-auto text-white">{content}</div>
      <div className="self-stretch my-auto text-stone-500">{getRelativeTime(timestamp)}</div>
    </div>
  );
};

export default ActivityItem;