'use client';

import { useEffect, useState } from 'react';

import MBTIPersonalityCard from '@/core/components/mbti-dashboard/mbti-personality-card';
import HorizScrollWithoutScrollbar from '@/core/components/shared/horiz-scroll-without-scrollbar';
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

  // Update personality
  useEffect(() => {
    if (!personality) return;
    // console.log('personality', personality);

    if (!personalities.length) {
      personalities.push(personality);
      return;
    }
    const index = personalities.findIndex(
      (item) => item.personalityType === personality.personalityType
    );
    if (index > -1) {
      const updPersonalities = [...personalities];
      const updPersonality = updPersonalities[index];
      updPersonality.cognitiveFnArr = personality.cognitiveFnArr;
      updPersonality.status = personality.status;
      updPersonalities[index] = updPersonality;
      setPersonalities(updPersonalities);
    } else {
      personalities.push(personality);
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
    <HorizScrollWithoutScrollbar className="max-w-[400px] m-auto flex items-center gap-1 bg-card p-1 rounded-2xl">
      {personalities.map((personality) => (
        <MBTIPersonalityCard
          personality={personality}
          personalityTranslations={personalityTranslations}
          onClick={handleCardClick}
          key={personality.personalityType}
        />
      ))}
    </HorizScrollWithoutScrollbar>
  ) : null;
};

export default MBTIPersonalityCards;
