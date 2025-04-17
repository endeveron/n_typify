'use client';

import AnimatedAppear from '@/core/components/shared/animated-appear';
import { MBTIPersonalityItem } from '@/core/types/mbti';

type DashboardHeaderProps = {
  personality: MBTIPersonalityItem | null;
};

const DashboardHeader = ({ personality }: DashboardHeaderProps) => {
  return (
    <AnimatedAppear
      isShown={!!personality}
      className="flex flex-col items-center uppercase cursor-default"
    >
      {!!personality ? (
        <>
          {/* MBTI Personality Type */}
          <div className="mb-1 text-4xl leading-none text-muted font-extrabold tracking-wide opacity-50">
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
    </AnimatedAppear>
  );
};

export default DashboardHeader;
