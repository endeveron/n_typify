'use client';

import { useEffect, useState } from 'react';

import { MBTIMapStatus, MBTIPersonalityItem } from '@/core/types/mbti';
import { PersonalityTypeTranslation } from '@/core/types/translation';
import { cognFnColorMap } from '@/core/utils/mbti';
import { cn } from '@/core/utils/common';

type FunctionItem = {
  functionId: string;
};

const MBTIPersonCardFunctionItem = ({ functionId }: FunctionItem) => {
  const bgColor = cognFnColorMap.get(functionId);

  return (
    <div className="w-4 flex flex-col items-center gap-2">
      {/* Colored line */}
      <div className={cn(`w-[14px] h-1 rounded-full`, bgColor)}></div>
      {/* Function ID */}
      <div className="text-[11px] text-muted font-bold leading-none">
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
  const matchStatus = personality.status;
  const isAbsoluteMatch =
    personalityData?.status === MBTIMapStatus.ABSOLUTE_MATCH;

  const handleCardClick = () => {
    onClick(personalityData!);
  };

  // Init data
  useEffect(() => {
    const currentMatchStatus = personalityData?.status;
    if (currentMatchStatus && currentMatchStatus === matchStatus) {
      return;
    }
    setPersonalityData(personality);

    // Init functions
    const fnItems = personality.functions
      .slice(0, 4)
      .map((id) => ({ functionId: id }));
    setFunctionItems(fnItems);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [personality, matchStatus]);

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
        `flex flex-col items-center p-2 bg-background border-2 rounded-xl select-none`,
        {
          'border-accent': isAbsoluteMatch,
          'border-background': !isAbsoluteMatch,
        }
      )}
    >
      {/* Title */}
      <div
        className={cn(
          `text-[11px] leading-none uppercase font-bold tracking-wider`,
          {
            'text-accent': isAbsoluteMatch,
          }
        )}
      >
        {translation?.title.split(' ')[1]}
      </div>

      {/* MBTI Personality Type */}
      <div className="my-1 text-4xl text-muted font-bold leading-none opacity-40">
        {personalityType}
      </div>

      {/* Functions */}
      <div className="flex justify-center gap-1.5">
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
