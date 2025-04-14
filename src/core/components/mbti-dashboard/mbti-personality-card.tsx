'use client';

import { useEffect, useState } from 'react';

import { MBTIPersonalityItem } from '@/core/types/mbti';
import { PersonalityTypeTranslation } from '@/core/types/translation';
import { cognFnColorMap } from '@/core/utils/mbti';
import { cn } from '@/core/utils/common';
import { ProgressSmall } from '@/core/components/ui/progress-small';

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
  personalityTranslations: PersonalityTypeTranslation[];
  onClick: (data: MBTIPersonalityItem) => void;
};

const MBTIPersonalityCard = ({
  personality,
  personalityTranslations,
  onClick,
}: MBTIPersonalityCardProps) => {
  const [personalityData, setPersonalityData] = useState<MBTIPersonalityItem>();
  const [translation, setTranslation] = useState<PersonalityTypeTranslation>();
  const [functionItems, setFunctionItems] = useState<FunctionItem[]>();

  const personalityType = personality.personalityType;
  const matchPercent = personality.matchPercent;

  const handleCardClick = () => {
    onClick(personalityData!);
  };

  // Init data
  useEffect(() => {
    const currentMatchPercent = personalityData?.matchPercent;
    if (currentMatchPercent && currentMatchPercent === matchPercent) {
      return;
    }

    // Set personality data
    setPersonalityData(personality);

    // Init functions
    const fnItems = personality.functions
      .slice(0, 4)
      .map((id) => ({ functionId: id }));
    setFunctionItems(fnItems);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [personality, matchPercent]);

  // Init translation
  useEffect(() => {
    if (!personalityTranslations.length) {
      throw new Error('Unable to get translations for personality card');
    }
    const personalityTranslation = personalityTranslations.find(
      (item) => item.type === personalityType
    );
    if (!personalityTranslation) {
      throw new Error('Unable to get translation for personality card');
    }

    setTranslation(personalityTranslation);
  }, [personalityType, personalityTranslations]);

  return personalityData ? (
    <div
      onClick={handleCardClick}
      className={cn(
        `flex flex-col items-center p-2 bg-background rounded-xl select-none cursor-pointer`
      )}
    >
      {/* Title */}
      <div className="my-0.5 text-[11px] leading-none uppercase font-bold text-accent tracking-wider">
        {translation?.title[0]}
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
        {functionItems?.map((item) => (
          <MBTIPersonCardFunctionItem
            functionId={item.functionId}
            key={item.functionId}
          />
        ))}
      </div>
    </div>
  ) : null;
};

export default MBTIPersonalityCard;
