'use client';

import { useEffect, useState } from 'react';

import { MBTIPersonalityItem } from '@/core/types/mbti';
import { cn } from '@/core/utils/common';

type DashboardHeaderProps = {
  personality: MBTIPersonalityItem | null;
};

const DashboardHeader = ({ personality }: DashboardHeaderProps) => {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    setIsReady(!!personality);
  }, [personality]);

  return (
    <div
      className={cn(
        `flex flex-col items-center uppercase cursor-default transition-opacity`,
        {
          'opacity-0': !isReady,
          'opacity-100': isReady,
        }
      )}
    >
      {!!personality ? (
        <>
          {/* MBTI Personality Type */}
          <div className="mb-1.5 text-[3.5rem] leading-none text-muted font-bold opacity-50">
            {personality.mbti.personalityType}
          </div>
          {/* Title */}
          <div className="text-accent text-xl font-extrabold tracking-wider">
            {`The ${personality.translation.title[0]}`}
          </div>
          {/* Subtitle */}
          <div className="mt-0.5 text-muted text-[11px] font-bold tracking-wider opacity-80">
            {personality.translation.subtitle}
          </div>
        </>
      ) : null}
    </div>
  );
};

export default DashboardHeader;
