'use client';

import CardFunction from '@/core/components/mbti-dashboard/card-function';
import AnimatedAppear from '@/core/components/shared/animated-appear';
import { CognitiveFnId, MBTIMapItem, MBTIType } from '@/core/types/mbti';
import { cn } from '@/core/utils/common';
import { MBTIMap } from '@/core/utils/mbti';
import { useEffect, useState } from 'react';

type MBTITypeCardProps = {
  title: string;
  type: MBTIType;
  onClick: (type: MBTIType) => void;
  isActive?: boolean;
};

const MBTITypeCard = ({
  title,
  type,
  onClick,
  isActive,
}: MBTITypeCardProps) => {
  const [cognFunctions, setCognFunctions] = useState<CognitiveFnId[]>();

  const handleCardClick = () => {
    onClick(type);
  };

  // Init data
  useEffect(() => {
    // Get cognitive functions data
    const cognFnData = MBTIMap.get(type) as MBTIMapItem;
    setCognFunctions(cognFnData.cognitiveFns);
  }, [type]);

  return (
    <AnimatedAppear
      isShown={!!cognFunctions?.length}
      onClick={handleCardClick}
      className={cn(
        `w-24 flex flex-col items-center p-2 bg-background rounded-xl select-none cursor-pointer transition-opacity`,
        {
          'opacity-20': isActive === false,
        }
      )}
    >
      {/* Title */}
      <div className="my-0.5 text-[10px] leading-none uppercase font-bold text-accent tracking-wide">
        {title}
      </div>

      {/* MBTI Personality Type */}
      <div
        className={cn(
          `my-1 text-2xl text-muted font-bold tracking-wide leading-none opacity-70 transition-all`,
          {
            'text-accent opacity-100': isActive === true,
          }
        )}
      >
        {type}
      </div>

      {/* Valuable Functions */}
      <div className="mt-0.5 flex justify-center gap-1.5">
        {cognFunctions?.slice(0, 4).map((functionId) => (
          <CardFunction
            functionId={functionId}
            hideColorLine
            key={functionId}
          />
        ))}
      </div>
      {/* Shadow Functions */}
      <div className="mt-1 flex justify-center gap-1.5">
        {cognFunctions?.slice(4).map((functionId) => (
          <CardFunction
            functionId={functionId}
            fadeFunctionId
            key={functionId}
          />
        ))}
      </div>
    </AnimatedAppear>
  );
};

export default MBTITypeCard;
