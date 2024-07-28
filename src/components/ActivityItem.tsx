import { ActivityItemProps } from "@/types";
import React from "react";
import Image from "next/image";


const ActivityItem: React.FC<ActivityItemProps> = ({
  imageUrl,
  content,
  time,
}) => {
  return (
    <div className="flex gap-3 items-center py-3 tracking-normal bg-blend-normal">
      <Image
        loading="lazy"
        src={imageUrl}
        width={32}
        height={32}
        className="shrink-0 self-stretch my-auto w-8 border border-solid bg-blend-normal aspect-square border-zinc-800 rounded-[50px]"
        alt={content}
      />
      <div className="flex-auto self-stretch my-auto text-white">{content}</div>
      <div className="self-stretch my-auto text-stone-500">{time}</div>
    </div>
  );
};

export default ActivityItem;
