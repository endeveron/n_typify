'use client';

import MBTIPersonalityCard from '@/core/components/mbti-dashboard/personality-card';
import AnimatedAppear from '@/core/components/shared/animated-appear';
import HorizScrollArea from '@/core/components/shared/horiz-scroll-area';
import { MBTIPersonalityItem, MBTIType } from '@/core/types/mbti';
import { cn } from '@/core/utils/common';

type PersonalityCardsProps = {
  personalities: MBTIPersonalityItem[];
  showPrompt?: boolean;
  removeCard?: (MBTIType: MBTIType) => void;
};

const PersonalityCards = ({
  personalities,
  showPrompt = true,
  removeCard,
}: PersonalityCardsProps) => {
  const itemsNumber = personalities.length;

  const handleRemoveItem = (MBTIType: MBTIType) => {
    if (!MBTIType || typeof removeCard !== 'function') return;
    removeCard(MBTIType);
  };

  return (
    <AnimatedAppear isShown={itemsNumber > 0}>
      <HorizScrollArea
        itemsNumber={itemsNumber}
        minItemsNumberToEnableScroll={4}
        className={cn(
          `w-full h-[104px] flex items-center gap-1 p-1 rounded-2xl bg-card`
        )}
      >
        {personalities.map((personality) => (
          <MBTIPersonalityCard
            personality={personality}
            onRemove={handleRemoveItem}
            showPrompt={showPrompt}
            key={personality.mbti.personalityType}
          />
        ))}
      </HorizScrollArea>
    </AnimatedAppear>
  );
};

export default PersonalityCards;
