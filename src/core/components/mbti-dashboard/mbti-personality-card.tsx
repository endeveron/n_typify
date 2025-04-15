'use client';

import { useMemo } from 'react';

import { ProgressSmall } from '@/core/components/ui/progress-small';
import { MBTIPersonalityItem } from '@/core/types/mbti';
import { cn } from '@/core/utils/common';
import { cognFnColorMap } from '@/core/utils/mbti';

type FunctionItem = {
  functionId: string;
};

const MBTIPersonCardFunctionItem = ({ functionId }: FunctionItem) => {
  const bgColor = cognFnColorMap.get(functionId);

  return (
    <div className="w-4 flex flex-col items-center gap-1">
      {/* Colored line */}
      <div className={cn(`w-[14px] h-1 rounded-full`, bgColor)}></div>
      {/* Function ID */}
      <div className="text-[11px] text-muted font-bold leading-none opacity-80">
        {functionId}
      </div>
    </div>
  );
};

type MBTIPersonalityCardProps = {
  personality: MBTIPersonalityItem;
  onClick: (data: MBTIPersonalityItem) => void;
};

const MBTIPersonalityCard = ({
  personality,
  onClick,
}: MBTIPersonalityCardProps) => {
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
    <div
      onClick={handleCardClick}
      className={cn(
        `flex flex-col items-center p-2 bg-background rounded-xl select-none cursor-pointer transition-opacity`,
        {
          'opacity-0': !personality,
          'opacity-100': !!personality,
        }
      )}
    >
      {/* Title */}
      <div className="my-0.5 text-[11px] leading-none uppercase font-bold text-accent tracking-wider">
        {personality.translation.title[0]}
      </div>

      {/* MBTI Personality Type */}
      <div
        className={cn(`my-1 text-2xl font-bold leading-none`, {
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
          <MBTIPersonCardFunctionItem
            functionId={item.functionId}
            key={item.functionId}
          />
        ))}
      </div>
    </div>
  );
};

export default MBTIPersonalityCard;
