import React from 'react';
import { UrlInfoProps } from '@/types';
import Pill from './Pill';
import Link from 'next/link';

const UrlInfo: React.FC<UrlInfoProps> = ({ url, label, time }) => (
  <div className="flex justify-between items-center">
    <div className="flex gap-2 items-center text-sm font-medium text-white">
      <div className="w-2.5 h-2.5 bg-green-300 rounded-full animate-pulse flex items-center gap-2 translate-y-[1px]" />
      <Link
        href={url}
        className="text-white cursor-pointer text-sm h-4 leading-4 transition-colors duration-200 w-[237.637px] text-ellipsis whitespace-nowrap"
      >
        {label}
        <Pill>Production</Pill>
      </Link>
    </div>
    <div className="flex items-center gap-4">
      <time className="text-xs text-stone-500">{time}</time>
    </div>
  </div>
);

export default UrlInfo;
