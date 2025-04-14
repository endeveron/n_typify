'use client';

import { useEffect, useState } from 'react';

import MBTIPersonalityCard from '@/core/components/mbti-dashboard/mbti-personality-card';
import HorizScrollArea from '@/core/components/shared/horiz-scroll-area';
import { CognFunctionArr, MBTIPersonalityItem } from '@/core/types/mbti';
import { PersonalityTypeTranslation } from '@/core/types/translation';

type MBTIPersonalityCardsProps = {
  cognitiveFnArr: CognFunctionArr;
  personalityTranslations: PersonalityTypeTranslation[];
  personality?: MBTIPersonalityItem;
};

const MBTIPersonalityCards = ({
  cognitiveFnArr,
  personality,
  personalityTranslations,
}: MBTIPersonalityCardsProps) => {
  const [personalities, setPersonalities] = useState<MBTIPersonalityItem[]>([]);

  const isReset = cognitiveFnArr.length === 0;

  const handleCardClick = (data: MBTIPersonalityItem) => {
    console.log('handleCardClick > data', data);
  };

  const sortPersonalityItems = (
    items: MBTIPersonalityItem[]
  ): MBTIPersonalityItem[] =>
    items.sort((a, b) => b.matchPercent - a.matchPercent);

  // Update personality
  useEffect(() => {
    if (!personality) return;

    // Add the first item
    if (!personalities.length) {
      setPersonalities([personality]);
      return;
    }

    // Update the existing item
    const index = personalities.findIndex(
      (item) => item.personalityType === personality.personalityType
    );
    if (index > -1) {
      const updPersonalities = [...personalities];
      const updPersonality = updPersonalities[index];
      updPersonality.cognitiveFnArr = personality.cognitiveFnArr;
      updPersonality.matchPercent = personality.matchPercent;
      updPersonality.status = personality.status;
      updPersonalities[index] = updPersonality;
      const sortedItems = sortPersonalityItems(updPersonalities);
      setPersonalities(sortedItems);
    } else {
      // Add a new item
      setPersonalities((prev) => sortPersonalityItems([...prev, personality]));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [personality]);

  // Reset personalities
  useEffect(() => {
    if (isReset) {
      setPersonalities([]);
    }
  }, [isReset]);

  return personalities.length ? (
    <HorizScrollArea className="h-[106px] mx-5 flex items-center gap-1 bg-card p-1 rounded-2xl">
      {personalities.map((personality) => (
        <MBTIPersonalityCard
          personality={personality}
          personalityTranslations={personalityTranslations}
          onClick={handleCardClick}
          key={personality.personalityType}
        />
      ))}
    </HorizScrollArea>
  ) : null;
};

export default MBTIPersonalityCards;
