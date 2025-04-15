'use client';

import MBTIPersonalityCard from '@/core/components/mbti-dashboard/mbti-personality-card';
import HorizScrollArea from '@/core/components/shared/horiz-scroll-area';
import { MBTIPersonalityItem } from '@/core/types/mbti';
import { cn } from '@/core/utils/common';

type MBTIPersonalityCardsProps = {
  personalities: MBTIPersonalityItem[];
};

const MBTIPersonalityCards = ({ personalities }: MBTIPersonalityCardsProps) => {
  const itemsNumber = personalities.length;
  const isItems = itemsNumber > 0;

  const handleCardClick = (data: MBTIPersonalityItem) => {
    console.log('handleCardClick > data', data);
  };

  return (
    <HorizScrollArea
      itemsNumber={itemsNumber}
      minItemsNumberToEnableScroll={4}
      className={cn(
        `h-[106px] mx-5 flex items-center gap-1 bg-card p-1 rounded-2xl transition-opacity`,
        {
          'opacity-0': !isItems,
          'opacity-100': isItems,
        }
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
  );
};

export default MBTIPersonalityCards;
