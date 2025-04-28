'use client';

import { useMemo, useState } from 'react';

import CardFunction from '@/core/components/mbti-dashboard/card-function';
import AnimatedAppear from '@/core/components/shared/animated-appear';
import { ProgressSmall } from '@/core/components/ui/progress-small';
import { MBTIPersonalityItem, MBTIType } from '@/core/types/mbti';
import { cn } from '@/core/utils/common';
import { useRouter } from 'next/navigation';

type PersonalityCardProps = {
  personality: MBTIPersonalityItem;
  showPrompt: boolean;
  onRemove?: (MBTIType: MBTIType) => void;
};

const PersonalityCard = ({
  personality,
  showPrompt,
  onRemove,
}: PersonalityCardProps) => {
  const router = useRouter();

  const [isPromptMode, setIsPromptMode] = useState(false);

  const type = personality.mbti.personalityType;
  const matchPercent = personality.mbti.matchPercent;
  const isPromptAllowed = matchPercent < 100 && showPrompt;
  const functions = useMemo(() => {
    return personality.mbti.functions
      .slice(0, 4)
      .map((id) => ({ functionId: id }));
  }, [personality.mbti.functions]);

  const handleContentClick = () => {
    if (isPromptAllowed) {
      setIsPromptMode(true);
    } else {
      router.push(`/mbti-type/${type}`);
    }
  };

  const handleCancel = () => {
    setIsPromptMode(false);
  };

  const handleOpenDetails = () => {
    router.push(`/mbti-type/${type}`);
  };

  const handleRemove = () => {
    if (!type || typeof onRemove !== 'function') return;
    onRemove(type);
  };

  return (
    <AnimatedAppear
      isShown={!!personality}
      className="relative w-24 h-24 p-2 flex flex-col items-center justify-center bg-background rounded-xl select-none"
    >
      <AnimatedAppear
        isShown={isPromptMode}
        timeout={700}
        className={cn(
          `absolute inset-0 flex flex-1 flex-col items-center justify-center gap-1 text-[11px] font-bold leading-none uppercase bg-background`,
          {
            'z-20': isPromptAllowed && isPromptMode,
          }
        )}
      >
        <div
          onClick={handleOpenDetails}
          className="-translate-y-0.5 p-2 text-accent-text cursor-pointer"
        >
          Details
        </div>
        <div
          onClick={handleCancel}
          className="p-2 text-muted/90 cursor-pointer"
        >
          Cancel
        </div>
        <div
          onClick={handleRemove}
          className="translate-y-0.5 p-2 text-red cursor-pointer"
        >
          Remove
        </div>
      </AnimatedAppear>

      <AnimatedAppear
        isShown={!isPromptMode}
        timeout={700}
        onClick={handleContentClick}
        className="z-10 flex flex-1 flex-col items-center justify-between cursor-pointer"
      >
        {/* Title */}
        <div className="my-0.5 text-[11px] leading-none uppercase font-bold text-accent-text tracking-wide">
          {personality.translation.title[0]}
        </div>

        {/* MBTI Personality Type */}
        <div
          className={cn(
            `my-0.5 text-2xl font-bold tracking-wide leading-none`,
            {
              'text-accent': matchPercent === 100,
              'text-muted opacity-70': matchPercent < 100,
            }
          )}
        >
          {type}
        </div>

        {/* Match Scale */}
        <div className="relative my-0.5 h-1 w-full">
          <ProgressSmall value={matchPercent} />
        </div>

        {/* Functions */}
        <div className="mt-1 flex justify-center gap-1.5">
          {functions?.map((item) => (
            <CardFunction functionId={item.functionId} key={item.functionId} />
          ))}
        </div>
      </AnimatedAppear>
    </AnimatedAppear>
  );
};

export default PersonalityCard;
