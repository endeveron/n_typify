'use client';

import { useMemo } from 'react';

import CardFunction from '@/core/components/mbti-dashboard/card-function';
import AnimatedAppear from '@/core/components/shared/animated-appear';
import { ProgressSmall } from '@/core/components/ui/progress-small';
import { MBTIPersonalityItem } from '@/core/types/mbti';
import { cn } from '@/core/utils/common';

type PersonalityCardProps = {
  personality: MBTIPersonalityItem;
  onClick: (data: MBTIPersonalityItem) => void;
};

const PersonalityCard = ({ personality, onClick }: PersonalityCardProps) => {
  const personalityType = personality.mbti.personalityType;
  const matchPercent = personality.mbti.matchPercent;
  const functions = useMemo(() => {
    return personality.mbti.functions
      .slice(0, 4)
      .map((id) => ({ functionId: id }));
  }, [personality.mbti.functions]);

  const handleCardClick = () => {
    onClick(personality);
  };

  return (
    <AnimatedAppear
      isShown={!!personality}
      onClick={handleCardClick}
      className={cn(
        `flex flex-col items-center p-2 bg-background rounded-xl select-none cursor-pointer`
      )}
    >
      {/* Title */}
      <div className="my-0.5 text-[11px] leading-none uppercase font-bold text-accent-text tracking-wide">
        {personality.translation.title[0]}
      </div>

      {/* MBTI Personality Type */}
      <div
        className={cn(`my-1 text-2xl font-bold tracking-wide leading-none`, {
          'text-accent': matchPercent === 100,
          'text-muted opacity-60': matchPercent < 100,
        })}
      >
        {personalityType}
      </div>

      {/* Match Scale */}
      <div className="relative my-0.5 h-1 w-full">
        <ProgressSmall value={matchPercent} />
      </div>

      {/* Functions */}
      <div className="mt-2 flex justify-center gap-1.5">
        {functions?.map((item) => (
          <CardFunction functionId={item.functionId} key={item.functionId} />
        ))}
      </div>
    </AnimatedAppear>
  );
};

export default PersonalityCard;
