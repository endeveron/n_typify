'use client';

import MBTIPersonalityCard from '@/core/components/mbti-dashboard/personality-card';
import AnimatedAppear from '@/core/components/shared/animated-appear';
import HorizScrollArea from '@/core/components/shared/horiz-scroll-area';
import { MBTIPersonalityItem } from '@/core/types/mbti';
import { cn } from '@/core/utils/common';

type PersonalityCardsProps = {
  personalities: MBTIPersonalityItem[];
};

const PersonalityCards = ({ personalities }: PersonalityCardsProps) => {
  const itemsNumber = personalities.length;

  const handleCardClick = (data: MBTIPersonalityItem) => {
    console.log('handleCardClick > data', data);
  };

  return (
    <AnimatedAppear isShown={itemsNumber > 0}>
      <HorizScrollArea
        itemsNumber={itemsNumber}
        minItemsNumberToEnableScroll={5}
        className={cn(
          `w-full h-[106px] flex items-center gap-1 p-1 rounded-2xl bg-card`
        )}
      >
        {personalities.map((personality) => (
          <MBTIPersonalityCard
            personality={personality}
            onClick={handleCardClick}
            key={personality.mbti.personalityType}
          />
        ))}
      </HorizScrollArea>
    </AnimatedAppear>
  );
};

export default PersonalityCards;
